var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var createConfig = require('./webpack.config');
var del = require('del');
var fs = require('fs');
var fse = require('fs-extra');

var Spinner = require('cli-spinner').Spinner;

//
// Get environment utility
// -----------------------------------------------------------------------------
const getEnv = function() {
	var environment = process.argv.filter(function(argv) { return /^--env\./.test(argv)})[0] || '--env.local'
	return /^--env\.(.*)/.exec(environment)[1];
}

//
// Webpack compiler configuration
// -----------------------------------------------------------------------------
const webpackConfig = createConfig(getEnv());
const compiler = webpack(webpackConfig);

//
// Get current executed task utility
// -----------------------------------------------------------------------------
const getTask = function () {
	return /^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start';
}

//
// Tasks handler
// -----------------------------------------------------------------------------
const tasks = new Map();
function run(task) {
    const start = new Date();
	const spinner = new Spinner(`Processing ${getTask()}.. %s`);
	spinner.setSpinnerString('|/-\\');
	spinner.start();
    return new Promise(function(resolve, reject){
		tasks.get(task)()
		.then(function() {
			console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
			spinner.stop(true);
			resolve();
		}, function(err){
			console.error(err.stack)
		})
	});
}

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', function() {
	return new Promise(function(resolve, reject) {
		const cleanDir = getEnv() == 'production' || getEnv() == 'test' ? [] : ['build/Release/**', '!build/Release'];
		del(cleanDir).then(function(){ resolve() });
	})
});

//
// Copy static files into the output folder
// -----------------------------------------------------------------------------
// TODO: Move assets from src folder to public folder
// TODO: Generate html using Webpack
tasks.set('copy', function() {
	return new Promise(function(resolve, reject) {
		if (getEnv() == 'production' || getEnv() == 'test') {
			fse.copy('src/assets', '../HUB.WEB/assets');
		} else {
			fse.copy('src/assets', 'build/Release/assets')
			fse.copy('src/index.html', 'build/Release/index.html')
		}
		resolve();
	})
});

//
// Bundle files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', function() {
    console.log(`Building ${getEnv()} package`);
    return new Promise(function(resolve, reject) {
        compiler.run(function (err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
});

//
// Build a production
// -----------------------------------------------------------------------------
tasks.set('build', function() {
    global.DEBUG = process.argv.includes('--debug') || false;
    return new Promise(function(resolve, reject) {
		run('clean')
			.then(function() {
				run('copy')
				.then(function() {
					run('bundle')
					.then(function() {
						console.log(`Your ${getEnv()} build is ready.`);
						resolve()
					})
				})
			})
	})
});

//
// Build local and launch it in a browser
// -----------------------------------------------------------------------------
tasks.set('start', function() {
    global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
	return new Promise(function(resolve, reject) {
		run('clean')
		.then(function() {
			run('copy')
		})
		.then(function() {
		    const server = new WebpackDevServer(compiler, {
    			hot: true,
                publicPath: webpackConfig.output.publicPath,
    			filename: webpackConfig.output.filename,
                stats: compiler.stats,
			    contentBase: './build/Release',
			    stats: {
			        colors: true
			    },
			    historyApiFallback: true
            });
            compiler.plugin('done', function() {
				server.listen(5000, 'localhost', resolve);
            });
		});
	})
});

//
// Execute the specified task or default one. E.g.: node run build
// -----------------------------------------------------------------------------
run(getTask());
