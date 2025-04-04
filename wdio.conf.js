const { AfterAll, After } = require("@wdio/cucumber-framework");

exports.config = {
    runner: 'local',
    path: '/',
    specs: [
        './features/**/*.feature'  
    ],
    exclude: [],
    maxInstances: 2,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--window-size=1920,1080'] 
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://userinyerface.com/',
    waitforTimeout: 12000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    framework: 'cucumber',
    reporters: ['spec',
        ['allure', {
            outputDir: './allure-results', 
            disableWebdriverStepsReporting: false,  
            disableWebdriverScreenshotsReporting: false 
        }]
    ],
    
    cucumberOpts: {
        require: ['./step-definitions/**/*.js'], 
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: true,
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },

    services: ['chromedriver'],

    beforeScenario: async () => {
        await browser.url('/');
        await browser.maximizeWindow();
    },

    AfterAll: async () => {
        await browser.deleteSession();
    }
};
