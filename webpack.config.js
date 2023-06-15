// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
	{
		mode: 'development',
		entry: './src/index.ts',
		target: 'electron-main',
		devtool: 'source-map',
		module: {
			rules: [
				{
					loader: 'ts-loader',
					test: /\.ts$/,
					options: {
						compilerOptions: {
							noEmit: false
						}
					}
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		output: {
			path: __dirname + '/webpack',
			filename: 'main.js'
		}
	},
	{
		mode: 'development',
		entry: './src/javascripts/renderer.ts',
		target: 'electron-renderer',
		devtool: 'source-map',
		module: {
			rules: [
				{
					loader: 'ts-loader',
					test: /\.ts$/,
					options: {
						compilerOptions: {
							noEmit: false
						}
					}
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		output: {
			path: __dirname + '/webpack',
			filename: 'renderer.js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		]
	},
	{
		mode: 'development',
		entry: './src/core/preload.ts',
		target: 'electron-preload',
		devtool: 'source-map',
		module: {
			rules: [
				{
					loader: 'ts-loader',
					test: /\.ts$/,
					options: {
						compilerOptions: {
							noEmit: false
						}
					}
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		output: {
			path: __dirname + '/webpack',
			filename: 'preload.js'
		}
	}
];