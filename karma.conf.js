// Karma configuration

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            'js/tests/*.spec.js',
            'js/**/*.js',
        ],

        systemjs: {
            serveFiles: [
                'mockData/*',
                'js/tests/*.spec.js',
                'js/**/*.js',
                'mockData/*',
                'js/*.js',
                'node_modules/isomorphic-fetch/fetch-npm-browserify.js',
                'node_modules/whatwg-fetch/fetch.js',
                'node_modules/sinon/lib/sinon.js',
                'node_modules/sinon/lib/sinon/util/*.js',
                'node_modules/sinon/lib/sinon/*.js',
                'node_modules/fetch-mock/src/*.js'
            ],
            // paths: {
            //   'asset':  'location'
            // },
            configFile: './systemjs.config.js',
            testFileSuffix: '.spec.js',
        },

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/**/!(*spec).js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-systemjs',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-sinon'
        ],

        coverageReporter: {
            reporters: [
                { type: 'json', subdir: '.', file: 'coverage-final.json' }
            ]
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        nocache: true
    })
}
