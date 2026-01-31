import { SoftAssertionService } from 'expect-webdriverio'

export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/not-issues.test.js'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']
        }   
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [SoftAssertionService, {}]
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: function (_capabilities, _specs) {
        // require('expect-webdriverio')
    }
};
