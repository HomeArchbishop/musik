'use strict'

const { app, protocol, BrowserWindow } = require('electron')
const { URL } = require('url')
const path = require('path')
const fs = require('fs')

const isDevelopment = process.env.NODE_ENV !== 'production'
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'

const createProtocol = (scheme) => {
  protocol.handle(scheme, (request) => {
    const pathName = decodeURI(new URL(request.url).pathname)
    try {
      const data = fs.readFileSync(path.join(__dirname, pathName))
      const extension = path.extname(pathName).toLowerCase()
      let mimeType = ''
      if (extension === '.js') {
        mimeType = 'text/javascript'
      } else if (extension === '.html') {
        mimeType = 'text/html'
      } else if (extension === '.css') {
        mimeType = 'text/css'
      } else if (extension === '.svg' || extension === '.svgz') {
        mimeType = 'image/svg+xml'
      } else if (extension === '.json') {
        mimeType = 'application/json'
      } else if (extension === '.wasm') {
        mimeType = 'application/wasm'
      }
      return new Response(data, {
        headers: { 'content-type': mimeType }
      })
    } catch (error) {
      console.error(`Failed to read ${pathName} on ${scheme} protocol`, error)
    }
  })
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    x: 50,
    y: 50,
    // frame: false,
    titleBarStyle: 'hiddenInset',
    // titleBarOverlay: true,
    show: false,
    backgroundColor: '#f6f6f6',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: path.resolve(__dirname, './preload.js')
    }
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL, { userAgent })
    if (!process.env.IS_TEST) win.webContents.openDevTools(/* { mode: 'detach' } */)
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html', { userAgent })
  }

  // win.on('resized', e => {
  //   const sizeData = win.getContentBounds()
  //   appConfig.window = sizeData
  //   updateAppConfig(appConfig)
  // })

  // win.on('moved', e => {
  //   const sizeData = win.getContentBounds()
  //   appConfig.window = sizeData
  //   updateAppConfig(appConfig)
  // })

  return win
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
