(function(_) {

    var deps = {
        exports: {}
    };

    // caller module name: lib/lodash, lib/alg/dijkstra
    // module name: "./lodash", "../lodash", "./lib/alg"
    // TODO: resolve paths correctly
    var getModuleName = function(callerModuleName, moduleName) {
        var splitedCallerModuleNameLength = callerModuleName.split("/"),
            splitedModuleName = moduleName.split("/");

        //splitedModuleName = splitedModuleName.slice(splitedCallerModuleNameLength);

        return splitedCallerModuleNameLength[splitedCallerModuleNameLength.length - 1];
    };

    var define =  function(moduleName, depsArray, callback) {
        moduleName = getModuleName("", moduleName);

        var module = {
            exports: {}
        };

        callback(function(requiredModuleName) {
            require(moduleName, requiredModuleName);
        }, {}, module);

        deps.exports[moduleName] = module.exports;
    };

    var require = function(callerModuleName, moduleName) {
        moduleName = getModuleName(callerModuleName, moduleName);

        return deps.exports[moduleName];
    };

    /*graphlibPlaceholder*/

    this.graphlib = deps.exports["index.js"];
})(_);