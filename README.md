<p align="center">
  <img src="./logo.png" width="128" height="128">
  <br>
  <br>
  <br>
    <a href="https://david-dm.org/rojcyk/viewports-server">
       <img src="https://david-dm.org/rojcyk/viewports-server.svg">
    </a>
</p>

<br />

## About

viewports-server is a server counterpart to the [viewports-client](https://github.com/rojcyk/viewports-client). What it does, is that it downloads data from [StatCounter](https://gs.statcounter.com/), it procecsses all the data, and transforms them into a format that the client can understand. The server itself is rather simple and has only one route available `host/api/viewports`

## Requirements

- It is a [Node.js](https://nodejs.org/en/) project.
- It is written in [Typescript](https://www.typescriptlang.org/).
- It uses [Postgres](https://www.postgresql.org/download/) for database.

_You should install all of these before you proceed with the local deployment._

## Remote Installation

You can deploy directly on Heroku!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

#### Remote scripts

There is a couple of scripts that you will need:

- `yarn run migrate` - It runs all the migrations and prepares the database _(should be run first)_
- `yarn run seed` - It populates the database with required dataset _(should be run second)_
- `yarn run update` - It downloads the latest data from StatCounter and populates the database _(should be run periodically)_
- `yarn run initDatabase` - It runs migration, seed, and update in sequence
- `typeorm schema:drop` - If you would like to delete everything and start from scratch.
  

## Local installation

0. Clone the repo
1. Install all the prerequisities via `yarn install`
2. Create a `.env` file with the following values for the locall development.

```
DATABASE_URL=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
SLACK_ROOT_URL=
SLACK_SIGNING_SECRET=
SLACK_REDIRECT_URI
SLACK_TOKEN=
SLACK_APP_SCOPES=
```

4. Run `yarn run dev:migration:run && yarn run dev:seed:run && yarn run dev:task:update`

#### Local scripts

Now that everything is setup you will need a couple of scripts for convenient local development.

- `yarn run dev` to start the local server
- `yarn run dev:migration:run` - It runs all the migrations and prepares the database _(should be run first)_
- `yarn run dev:migration:generate [name]` - If you update the models, run this script. It will generate updated migrations.
- `yarn run dev:seed:run` - It populates the database with required dataset _(should be run second)_
- `yarn run dev:task:update` - It downloads the latest data from StatCounter and populates the database _(should be run periodically)_
- `yarn run dev:db:drop` - If you would like to delete everything and start from scratch.

## Functionality

The primary thing this server does is that it opens up its `[GET]` `/api/viewports` route. You can expect a response like this:

```json
{
  "status": "success",
  "code": 200,
  "month": 6,
  "year": 2020,
  "data": {
    "mobile": {
      "ww": [{
        "share": "23.25",
        "display": {
          "width": 360,
          "height": 640
        }
      }]
    }
  } 
}
```

_Example with only mobile platform, and world wide data. The actuall response contains data for all platforms and regions._

## Slack support

The server now supports Slack authorization, and sending data messages to workspaces (public & private channels, dms).

1. First you need to [create a Slack App](https://api.slack.com/apps)
2. Copy all the necessary values into your local .env, or heroku instance.
3. Setup all the command, auth, and redirect values in your app settings.
4. At this point the slack support is ready, and you can trigger the auth with `https://yourhost.com/slack/add`.

