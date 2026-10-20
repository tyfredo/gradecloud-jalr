import 'dotenv/config'
import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 4000)
if (!Number.isInteger(port) || port <= 0) {
  throw new Error('PORT debe ser un número entero positivo')
}

createApp().listen(port, '0.0.0.0', () => {
  console.log(`GradeCloud API escuchando en el puerto ${port}`)
})