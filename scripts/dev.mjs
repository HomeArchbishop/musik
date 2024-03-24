/* dev.js */
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createServer } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const VITE_DEV_SERVER_PORT = 8746
const VITE_DEV_SERVER_URL = `http://localhost:${VITE_DEV_SERVER_PORT}`

process.env.NODE_ENV = 'development'
process.env.VITE_DEV_SERVER_URL = VITE_DEV_SERVER_URL

;(async () => {
  console.info('  ➜  Starting development server...')

  const viteDevServer = await createServer({
    root: path.resolve(__dirname, '..'),
    server: {
      port: VITE_DEV_SERVER_PORT
    }
  })
  await viteDevServer.listen()

  console.info(`  ➜  Vite development server: ${VITE_DEV_SERVER_URL}`)
  console.info('  ➜  Starting electron...')

  await promisify(exec)('npx electron .', { env: process.env, maxBuffer: 2 * 1024 * 1024 * 1024 })

  console.info('  ➜  Electron closed')
  console.info('  ➜  Closing development server...')

  await viteDevServer.close()

  console.info('  ➜  Development server closed')
  console.info('  ➜  End process')
})()
