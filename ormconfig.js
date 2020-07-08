const path = require('path')
const entities = path.join(__dirname, 'src/models', `*.{ts,js}`)
const migrations = path.join(__dirname, 'src/migrations', `*.{ts,js}`)

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  entities: [entities],
  migrations: [migrations],
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
  synchronize: false,
  // subscribers: ["src/db/subscriber/**/*.ts"],
  cli: {
     entitiesDir: 'src/models',
     migrationsDir: 'src/migrations',
    //  subscribersDir: "src/db/subscriber"
  }
}