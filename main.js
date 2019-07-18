const { app, BrowserWindow } = require('electron')

let win;
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 400,
    height: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
})

// and load the index.html of the app.
win.loadFile('index.html')
win.setMenu(null)
win.webContents.openDevTools()
}

app.on('ready', createWindow)