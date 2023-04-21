// electron/electron.js
const path = require('path');
const { app, BrowserWindow, Menu, Tray } = require('electron');

const isDev = process.env.IS_DEV == "true" ? true : false;

let mainWindow, tray, trayMenu;
let trayIndex = 0, trayAnimationId = null

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopTrayIconAnimation();
    app.quit();
  }
});