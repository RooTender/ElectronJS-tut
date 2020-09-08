const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow, addWindow;

// Listen for app to be ready
app.on('ready', function() {

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({ // file:./mainWindow.html
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // menu toolbar
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // close other apps on quit
    mainWindow.on('closed', () => {
        app.quit();
    })
})

// Handle create add window
function createAddWindow() {

    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item'
    });
    addWindow.loadURL(url.format({ // file:./mainWindow.html
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Garbage collector handler
    addWindow.on('close', () => addWindow = null);
}

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // shortcut
                click() {
                    app.quit()
                }
            }
        ]
    }
];