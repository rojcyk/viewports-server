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

### Installation

You can deploy directly on Heroku!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

or

0. Clone the repo
1. Install all the prerequisities and run `yarn install` or `npm install`
2. Create a `.env` file with the following values for the locall development.

```
DB_USERNAME=
DB_NAME=
DB_PASSWORD=    
DB_HOST=
```

3. Run the migrations `yarn run dev:migration:run` locally or `yarn run migrate` in production.
4. Run the data seeds `yarn run dev:seed:run` locally or `yarn run seed` in production.
5. Download the up to date data via `yarn run dev:task:update` locally or `yarn run update` in production.
6. Run the app via `yarn run dev` locally or `yarn start` in production.
