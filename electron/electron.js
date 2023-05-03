// electron/electron.js
const path = require('path');

const { app, BrowserWindow, Menu, Tray } = require('electron');
const log = require('electron-log')

const updater = require('./updater.js')

const isDev = process.env.IS_DEV == "true" ? true : false;

let mainWindow, tray, trayMenu;
let trayIndex = 0, trayAnimationId = null
let update_check_interval_id = null

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  });

  mainWindow.menuBarVisible = false;

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );

  mainWindow.on('ready-to-show', () => {
    mainWindow.webContents.setZoomFactor(0.66);
  })

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  initTrayIconMenu();
  setTrayIconAnimation();
}

const initTrayIconMenu = () => {
  tray = new Tray(path.join(__dirname, "..", '/images/icon_.png'));
  trayMenu = Menu.buildFromTemplate([
    { label: '앱 열기', type: 'normal', click: () => { openApp(); }},
    { label: '앱 종료', type: 'normal', click: () => { closeApp(); }}
  ])
  tray.setToolTip('DedenneApp');
  tray.setContextMenu(trayMenu);

  tray.addListener('double-click', () => {
    openApp();
  })
}

const openApp = () => {
  mainWindow.show();
}

const closeApp = () => {
  mainWindow.close();
}

const setTrayIconAnimation = (delay=200) => {
  trayAnimationId = setInterval(() => {
    if(trayIndex >= 10) {
      trayIndex = trayIndex % 10;
    }
    tray.setImage(path.join(__dirname, "..", '/images/image_' + trayIndex + '.png'));
    trayIndex +=1;
  }, delay)
}

const stopTrayIconAnimation = () => {
  if(trayAnimationId != null) { 
    clearInterval(trayAnimationId)
  }
  trayAnimationId = null
}

app.whenReady().then(() => {

  updater.checkUpdate();

  update_check_interval_id = setInterval(() => {
    if(updater.updateResult() == 0) {
      createWindow();
      app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      })

      clearInterval(update_check_interval_id);
    }
  }, 20);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopTrayIconAnimation();
    app.quit();
  }
});