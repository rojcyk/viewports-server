<p align="center">
  <img src="./logo.png" width="128" height="128">
  <br>
  <br>
  <br>
    <a href="https://www.codacy.com/manual/rojcyk/viewports-server?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rojcyk/viewports-server&amp;utm_campaign=Badge_Grade">
       <img src="https://app.codacy.com/project/badge/Grade/350480bc997b459eaae80a2590dde884">
    </a>
    <a href="https://david-dm.org/rojcyk/viewports-server">
       <img src="https://david-dm.org/rojcyk/viewports-server.svg">
    </a>
</p>


### Requirements

- It is a [Node.js](https://nodejs.org/en/) project.
- It is written in [Typescript](https://www.typescriptlang.org/).
- It uses [Postgres](https://www.postgresql.org/download/) for database.

_You should install all of these before you proceed to the actuall installation._

<br />

### Remote Installation

You can deploy directly on Heroku!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

#### Remote scripts

There is a couple of scripts that you will need:

- `yarn run migrate` - It runs all the migrations and prepares the database _(should be run first)_
- `yarn run seed` - It populates the database with required dataset _(should be run second)_
- `yarn run update` - It downloads the latest data from StatCounter and populates the database _(should be run periodically)_
- `typeorm schema:drop` - If you would like to delete everything and start from scratch.
  
<br />

### Local installation

0. Clone the repo
1. Install all the prerequisities via `yarn install`
2. Create a `.env` file with the following values for the locall development.

```
DB_USERNAME=
DB_NAME=
DB_PASSWORD=    
DB_HOST=
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
