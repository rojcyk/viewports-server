if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const path = require('path')

const folderPath = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const entities = path.join(__dirname, `${folderPath}/models`, `*.{ts,js}`)
const migrations = path.join(__dirname, `${folderPath}/migrations`, `*.{ts,js}`)

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  entities: [entities],
  migrations: [migrations],
  migrationsRun: true,
  seeds: [`${folderPath}/seeds/**/*.{ts,js}`],
  factories: [`${folderPath}/factories/**/*.{ts,js}`],
  synchronize: false,
  cli: {
     entitiesDir: `${folderPath}/models`,
     migrationsDir: `${folderPath}/migrations`,
  }
}