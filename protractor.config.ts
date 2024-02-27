import { Config } from 'protractor';

export const config: Config = {
    baseUrl: 'http://localhost:8100',
    capabilities: {
        'browserName': 'firefox'
    },
    specs: [
        '**/*.e2e-spec.js',
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },
    allScriptsTimeout: 20000,
};
