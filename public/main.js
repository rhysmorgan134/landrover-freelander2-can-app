const electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    ipcMain = electron.ipcMain,
    globalShortcut = electron.globalShortcut
// const {carplayWorker} = require('./node-CarPlay/index')
const Settings = require('./SettingsStore')
const Carplay = require('node-carplay')


const path = require('path'),
    isDev = require('electron-is-dev');

require('./server')()

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        kiosk : isDev ? false : true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false
        }})

    globalShortcut.register('f5', function () {
        console.log('f5 is pressed')
        mainWindow.webContents.openDevTools()
    })

    const appUrl = isDev ? 'http://localhost:3000' :
        `file://${path.join(__dirname, '../build/index.html')}`
    mainWindow.loadURL(appUrl)
    mainWindow.on('closed', () => mainWindow = null)
    // mainWindow.webContents.openDevTools({mode: 'detach'})

    let size = mainWindow.getSize()

    const settings = new Settings()
    settings.store.set('fps', 30)
    const config = {
        dpi: settings.store.get('dpi'),
        nightMode: 0,
        hand: settings.store.get('lhd'),
        boxName: 'nodePlay',
        width: size[0],
        height: size[1],
        fps: settings.store.get('fps'),
    }

    let carplay = new Carplay(config)

    ipcMain.on("fpsReq", (event) => {
        console.log("fps req")
        event.returnValue = settings.store.get('fps')
    })

    ipcMain.on('click', (event, data) => {
        carplay.sendTouch(data.type, data.x, data.y)
        console.log(data.type, data.x, data.y)
    })

    ipcMain.handle('getStoreValue', (event, key) => {
        return settings.store.get(key);
    });
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    // Follow OS convention on whether to quit app when
    // all windows are closed.
    if (process.platform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
    // If the app is still open, but no windows are open,
    // create one when the app comes into focus.
    if (mainWindow === null) { createWindow() }
})

