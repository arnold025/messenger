const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/platzinger/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    win = null;
  })
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
  if (win === null) createWindow();
});
/**
 * 1 - generar build
 * 2 - npm install electron -g --save-exact
 * 3 - package.json indicar dentro de "scripts" incluir las siguientes lineas:
    "electron" : "ng build && electron .",
    "electron-aot": "ng build --prod && electron ."
 * 4 - dentro de carpeta dist acceder al index.html y remplazar la etiqueta <base href="/"> por <base href="./">
 * 5 - generar main.js para desplegar electron.
 * 6 - npm run electron-aot genera build y lanza una ventana de electron con la app.
 * ----- Generar .exe -------
 * 7 - npm install -g electron-packager
 * 8 - electron-packager ./ AppName --platform=win32 --icon .\src\assets\img\logo_live.ico
 */
