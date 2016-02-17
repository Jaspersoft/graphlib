module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    "baseUrl": "./build/converted",

                    "optimize": "none",

                    "skipDirOptimize": true,

                    "removeCombined": true,

                    "preserveLicenseComments": true,

                    "paths": {
                        "lib/lodash": "empty:"
                    },

                    "packages": [{
                        name: "lib",
                        main: "index.js"
                    }, {
                        name: "lib/alg",
                        main: "index.js"
                    }],

                    "name": "index.js",

                    "out": "build/optimized/graphlib.js"
                }
            }
        },
        copy: {
            target: {
                files: [
                    {   //all source files except 3'd party which are placed in bower_components
                        expand: true,
                        cwd: '.',
                        src: [
                            'index.js',
                            'lib/**/*.js'
                        ],
                        dest: 'build/converted/'
                    }
                ]
            }
        },
        clean: {
            src: ['build/converted'],
            options: {
                force: true
            }
        },
        exec: {
            exec_rjs: "node ./node_modules/requirejs/bin/r.js -convert ./build/converted ./build/output"
        }
    });

    grunt.registerTask("wrap", "Wraps requirejs output file", function() {
        var fileContent = grunt.file.read("./build/optimized/graphlib.js"),
            template = grunt.file.read("./graphlib.template.js");

        var result = template.replace(/\/\*graphlibPlaceholder\*\//g, fileContent);

        grunt.file.write("./dist/shim/graphlib.shim.js", result);
    });

    grunt.registerTask("default", "Build graphlib amd module", [
            "clean",
            "copy",
            "exec",
            "requirejs",
            "wrap"
        ]);
};