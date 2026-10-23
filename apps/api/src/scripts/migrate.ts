import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { pool } from '../db.js'

try {
    const sql = await readFile(new URL('../../sql/schema.sql',
        import.meta.url), 'utf-8')
        await pool.query(sql)
        console.log('Migracion aplicada correctamente')
} catch (error) {
    console.error('Error en migracion: ', error)
    process.exitCode = 1
} finally {
    await pool.end()
}