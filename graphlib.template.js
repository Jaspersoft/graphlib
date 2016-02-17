(function(_) {

    var deps = {
        exports: {
            "lib/lodash": _
        }
    };

    // caller module name: lib/lodash, lib/alg/dijkstra
    // module name: "./lodash", "../lodash", "./lib/alg"
    var getModuleName = function(callerModuleName, moduleName) {
        var splitedModuleName = moduleName.split("/"),
            splitedCallerModuleName = callerModuleName.split("/"),
            splitedCallerModuleLength = splitedCallerModuleName.length;

        if (moduleName.match(/^\.\//)) {
            splitedCallerModuleName.splice([splitedCallerModuleLength - 1], 1);

            [].push.apply(splitedCallerModuleName, splitedModuleName.slice(1));

            return splitedCallerModuleName.join("/");
        } else if(moduleName.match(/^\.\.\//)) {
            var result = [];

            splitedCallerModuleName.reverse();
            splitedModuleName.reverse();

            for (var i = 0; i < splitedCallerModuleLength; i++) {
                var fragment = splitedModuleName[i];

                if (!_.isUndefined(fragment)) {
                    if (splitedModuleName[i] !== "..") {
                        result.push(splitedModuleName[i]);
                    }

                    if (i + 1 === splitedCallerModuleLength) {
                        result.push(splitedCallerModuleName[i]);
                    }
                } else {
                    result.push(splitedCallerModuleName[i]);
                }
            }

            return result.reverse().join("/");
        } else {
            return moduleName;
        }
    };

    var define = function(moduleName, depsArray, callback) {
        var result,
            module = {
                exports: {}
            },
            dependencies = _.map(depsArray, function(name) {
                if (name === "require") {
                    return function(dep) {
                        return require.call(null, moduleName, dep);
                    };
                } else if (name === "exports") {
                    return module.exports;
                } else if (name === "module") {
                    return module;
                }

                return deps.exports[getModuleName(moduleName, name)];
            });

        moduleName = getModuleName(moduleName, moduleName);

        result = callback.apply(null, dependencies);

        deps.exports[moduleName] = result || module.exports;
    };

    var require = function(callerModuleName, moduleName) {
        moduleName = getModuleName(callerModuleName, moduleName);

        return deps.exports[moduleName];
    };

    /*graphlibPlaceholder*/

    this.graphlib = deps.exports["index.js"];
})(_);