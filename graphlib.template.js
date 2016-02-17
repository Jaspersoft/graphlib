(function(_) {

    var deps = {
        exports: {
            "lodash": _
        }
    };

    // caller module name: lib/lodash, lib/alg/dijkstra
    // module name: "./lodash", "../lodash", "./lib/alg"
    // TODO: resolve paths correctly
    var getModuleName = function(callerModuleName, moduleName) {
        var splitedCallerModuleNameLength = callerModuleName.split("/"),
            splitedModuleName = moduleName.split("/");

        //splitedModuleName = splitedModuleName.slice(splitedCallerModuleNameLength);

        return splitedModuleName[splitedModuleName.length - 1];
    };

    var define =  function(moduleName, depsArray, callback) {
        var result;

        moduleName = getModuleName("", moduleName);

        var module = {
            exports: {}
        };

        var callbackString = callback.toString();

        if (callbackString.match(/function[\s]*\([\s]*require[\s]*,[\s]*exports[\s]*,[\s]*module[\s]*\)[\s]*/)) {
            result = callback(function(requiredModuleName) {
                return require(moduleName, requiredModuleName);
            }, {}, module);
        } else {
            result = callback.apply(null, _.map(depsArray, function(name) {
                return deps.exports[getModuleName("", name)];
            }));
        }

        deps.exports[moduleName] = result || module.exports;
    };

    var require = function(callerModuleName, moduleName) {
        moduleName = getModuleName(callerModuleName, moduleName);

        return deps.exports[moduleName];
    };

    /*graphlibPlaceholder*/

    this.graphlib = deps.exports["index.js"];
})(_);