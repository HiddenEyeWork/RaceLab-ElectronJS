const path = require('path');

module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'my_electron_app',
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-vite', 
            devContentSecurityPolicy: "connect-src 'self' 'unsafe-eval' 'unsafe-inline' * ws://localhost:* wss://localhost:* https://*.racelab.app",
            devServer: {
                hot: false,
            },
            config: {
                build: [
                    {
                        // entry: 'src/main/index.ts',
                        config: 'vite.main.config.js'
                    }
                ],
                renderer: [
                    {
                        config: 'vite.renderer.config.js',
                        entryPoints: [
                            {
                                name: "cockpit",
                                html: path.resolve(__dirname, '/public/index.html'),
                                js: path.resolve(__dirname, '/src/renderer/cockpit/index.tsx'),
                            },
                            {
                                name: "server",
                                html: path.resolve(__dirname, '/public/server.html'),
                                js: path.resolve(__dirname, '/src/renderer/server/index.tsx'),
                            },
                            {
                                name: "overlayHost",
                                html: path.resolve(__dirname, '/src/renderer/overlayHost/index.html'),
                                js: path.resolve(__dirname, '/src/renderer/overlayHost/index.tsx'),
                            },
                        ],
                    }
                ],
            }
        }
    ],
    hooks: {
        preStart: {
            command: 'yarn renderer'
        }
    }
};