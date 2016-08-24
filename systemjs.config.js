/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'js', // 'dist',
        'app1': 'js', // 'dist',
        '@angular': 'node_modules/@angular',
        'sinon': 'node_modules/sinon/lib',
        'mockData': 'mockData',
        'whatwg-fetch': 'node_modules/whatwg-fetch',
        "isomorphic-fetch": 'node_modules/isomorphic-fetch',
        'js': "js",
        'systemjs': 'node_modules/systemjs/dist/system.js',
        'traceur': 'node_modules/traceur/src/traceur.js',
        'fetch-mock': 'node_modules/fetch-mock/src/',
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'tests/FFClient.spec.js', defaultExtension: 'js' },
        'app1': { defaultExtension: 'js' },
        'isomorphic-fetch': { main: 'fetch-npm-browserify', defaultExtension: 'js' },
        'whatwg-fetch': { main: 'fetch.js', defaultExtension: 'js' },
        'sinon': { main: 'sinon.js', defaultExtension: 'js' },
        'fetch-mock': { main: 'client.js', defaultExtension: 'js' },
    };

    var config = {
        baseURL: "/",
        map: map,
        packages: packages,
        meta: {
            '*.json': { loader: 'json' }
        },
        defaultJSExtensions: false,
        packageConfigPaths: [
            "/node_modules/*/package.json",
            "/node_modules/**/package.json",
        ]
    };

    System.config(config);

})(this);
