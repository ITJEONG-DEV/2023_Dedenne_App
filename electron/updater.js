const path = require('path')

const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater');
const ProgressBar = require('electron-progressbar');

const log = require('electron-log')

let progressBar = null

const repo = '2023_Dedenne_App'
const owner = 'ITJEONG-DEV'
const token = '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'

const updateAvailableOption = {
  title: '업데이트 안내',
  message: '새로운 버전으로 업데이트합니다'
}

const progressBarOption = {
  indeterminate: false,
  text: '다운로드 진행 상황',
  detail: '다운로드 준비 중'
}

const updateDownloadedOption = {
  title: '다운로드 완료',
  message: '다운로드가 완료되었습니다. 프로그램 종료 후 최신 버전을 설치합니다.'
}

let result = -1;

module.exports = {
  updateResult: function () {
    return result;
  },
  checkUpdate: function () {
    autoUpdater.updateConfigPath = path.join(__dirname, "app-update.yml");
    autoUpdater.setFeedURL({
      provider: 'github',
      repo: repo,
      owner: owner,
      private: true,
      token: token
    })
  
    autoUpdater.on("error", (e)=> {
      log.info("error: ", e);
  
      dialog.showErrorBox("ERROR!", e);
    })
  
    autoUpdater.on("checking-for-update", () => {
      log.info("Checking for update...");
    })
  
    autoUpdater.on('update-available', () => {
      log.info("update available");
  
      index = dialog.showMessageBoxSync(updateAvailableOption);
  
      progressBar = new ProgressBar(progressBarOption);
        
      progressBar
      .on('completed', function () {
        console.info(`completed...`);
        progressBar.detail = '다운로드 완료.';
      })
      .on('aborted', function (value) {
        console.info(`다운로드 중단됨. ${value}`);
      })

      autoUpdater.downloadUpdate();
    })
  
    autoUpdater.on('update-not-available', () => {
      log.info("update not available")
      // dialog.showMessageBoxSync(updateNotAvailableOption)
  
      result = 0;
    });
  
    autoUpdater.on('download-progress', (progressInfo) => {
      log.info("download progress")
  
      progressBar.value = progressInfo.percent;
      progressBar.detail = `${progressInfo.transferred}/${progressInfo.total}`
    });
  
    autoUpdater.on('update-downloaded', () => {
      log.info("autoUpdater: update-downloaded")
  
      if(progressBar != null) {
        progressBar.close();
      }
  
      dialog.showMessageBoxSync(updateDownloadedOption)
      autoUpdater.quitAndInstall(false, true);
    });
  
    autoUpdater.checkForUpdates().catch((e) => {
      log.info(e);
    })
  }
}