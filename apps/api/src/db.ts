import 'dotenv/config'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  // La conexión solo se utiliza cuando se ejecuta una consulta.
  console.warn('DATABASE_URL no configurada; define apps/api/.env')
}

export const pool = new Pool({
  connectionString,
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
})