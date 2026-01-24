
export const config: WebdriverIO.MultiremoteConfig = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    //
    specs: [
        './test/specs/**/*.e2e.test.ts'
    ],
    //
    // ============
    // Capabilities
    // ============
    //
    maxInstances: 10,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    //  args: ['--headless', '--disable-gpu']
                }
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'moz:firefoxOptions': {
                    //  args: ['-headless']
                }
            }
        } 
    },
    //
    // ===================
    // Test Configurations
    // ===================
    //
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    //
    // =====
    // Hooks
    // =====
    //
    before: function (capabilities, specs) {
        // require('expect-webdriverio') // Not needed if using types in tsconfig and auto-import, but good to be safe or if using JS.
        // Actually, with the latest expect-webdriverio, it is often auto-imported or we import it in the test.
        // But let's verify how to properly setup expect-webdriverio.
    },
}
