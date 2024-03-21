/* build.js */
import { exec as execCallbackified } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { build } from 'vite'
import { api as forgeApi } from '@electron-forge/core'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const exec = promisify(execCallbackified)

process.env.NODE_ENV = 'production'

;(async () => {
  console.info('  ➜  Building static files...')

  await build({
    root: path.resolve(__dirname, '..'),
    build: {
      emptyOutDir: true,
      outDir: 'dist_vite'
    }
  })

  console.info('  ➜  Finished building static files')

  console.info('  ➜  Building electron files...')
  // TODO: pack electron files instead of copy to solve deps problems
  await exec(`cp ${path.resolve(__dirname, '../src/background.js')} ${path.resolve(__dirname, '../dist_vite/background.js')}`)
  await exec(`cp ${path.resolve(__dirname, '../src/preload.js')} ${path.resolve(__dirname, '../dist_vite/preload.js')}`)
  const packageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString())
  packageJSON.main = 'background.js'
  fs.writeFileSync(path.resolve(__dirname, '../dist_vite/package.json'), JSON.stringify(packageJSON, null, 2))

  console.info('  ➜  Finished building electron files')

  // console.info('  ➜  Packaging electron ...')
  // await forgeApi.package({
  //   dir: path.resolve(__dirname, '../dist_vite'),
  //   outDir: path.resolve(__dirname, '../dist_electron')
  // })
  // console.info('  ➜  Electron packaged')

  console.info('  ➜  Making electron app...')

  await forgeApi.make({
    dir: path.resolve(__dirname, '../dist_vite'),
    outDir: path.resolve(__dirname, '../dist_electron')
  })

  console.info('  ➜  Electron app made')
  console.info('  ➜  End process')
})()
