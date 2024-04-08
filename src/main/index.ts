import { app, BrowserWindow } from 'electron';
import path from 'path';
require('dotenv').config();

import { RACELAB_PORT } from './const';

const MAIN_WINDOW_VITE_DEV_SERVER_URL: string = 'http://localhost:5173';
const EXPRESS_SERVER_URL: string = `http://localhost:${RACELAB_PORT}`;

// declare var MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare var OVERLAY_HOST_WINDOW_WEBPACK_ENTRY: string;
declare var SERVER_WINDOW_WEBPACK_ENTRY: string;


let cockpitWindowWidth = 1440 + 48;
let cockpitWindowHeight = 924;

// const isDev:boolean = ( NODE_ENV === 'development' ? true: false );

const createWindow = () => {
    const cockpitWindow = new BrowserWindow({
        width: cockpitWindowWidth,
        height: cockpitWindowHeight,
        title: "cockpit",
        // show: isDev,
        webPreferences: {
            devTools: true,
            backgroundThrottling: false,
            nodeIntegration: true,
            // enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
        }
    });


    // cockpitWindow.loadFile(path.join(__dirname, `../renderer/src/renderer/cockpit/index.html`))
    // cockpitWindow.webContents.openDevTools();

    const serverWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "server",
        // show: isDev,
        webPreferences: {
            devTools: true,
            backgroundThrottling: false,
            nodeIntegration: true,
            // enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
        }
    });

    // serverWindow.loadFile(path.join(__dirname, `../renderer/src/renderer/server/index.html`))
    // serverWindow.webContents.openDevTools();
    
    console.log(process.env.MODE);
    const loadWindowContent = (window: BrowserWindow, winName: string, filePath: string) => {
        if (process.env.MODE === 'development') {
            console.log("Loading from development server");

            if(winName === 'cockpit'){
                window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
            }

            if(winName === 'server'){
                window.loadURL(EXPRESS_SERVER_URL);
            }
            
            window.webContents.openDevTools(); 
        } else {
            console.log("Loading from file system");

            window.loadFile(path.join(__dirname, filePath));
            window.webContents.openDevTools(); 
        }
    };

    loadWindowContent(cockpitWindow, 'cockpit', '../renderer/src/renderer/cockpit/index.html');
    loadWindowContent(serverWindow, 'server', '../renderer/src/renderer/server/index.html');


}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});