import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        }
    },
    //
    // ==================
    // Specify Test Files
    // ==================
    //
    specs: [
        './test/specs/**/*.test.ts'
    ],
    //
    // ============
    // Capabilities
    // ============
    //
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']
        }
    }],
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
