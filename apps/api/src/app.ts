import 'dotenv/config'
import express, { type ErrorRequestHandler } from 'express'
import cors from 'cors'
import { pool } from './db.js'

export function createApp() {
  const app = express()

  const origins = (
    process.env.CORS_ORIGIN ?? 'http://localhost:3000'
  )
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  app.use(cors({ origin: origins }))
  app.use(express.json({ limit: '20kb' }))

  // Verifica que el servidor Express esté funcionando.
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'gradecloud-api',
    })
  })

  // Verifica la conexión real con PostgreSQL.
  app.get('/ready', async (_req, res) => {
    try {
      await pool.query('SELECT 1')

      res.json({
        status: 'ready',
      })
    } catch (error) {
      console.error('Error de conexión PostgreSQL:', error)

      res.status(503).json({
        status: 'database_unavailable',
      })
    }
  })

  // Manejo de rutas inexistentes.
  app.use((_req, res) => {
    res.status(404).json({
      error: {
        message: 'Ruta no encontrada',
      },
    })
  })

  // Manejo centralizado de errores.
  const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next,
  ) => {
    console.error('Error interno en API:', error)

    res.status(500).json({
      error: {
        message: 'Error interno del servidor',
      },
    })
  }

  app.use(errorHandler)

  return app
}