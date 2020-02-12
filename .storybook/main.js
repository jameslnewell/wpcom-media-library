const path = require( 'path' );

module.exports = {
	stories: [ '../src/**/*.stories.{ts,tsx}' ],
	addons: [
		'@storybook/addon-actions',
		{
			name: '@storybook/preset-typescript',
			options: {
				tsLoaderOptions: {
					configFile: path.resolve(__dirname, '../tsconfig.json'),
					transpileOnly: true,
				},
				tsDocgenLoaderOptions: {
					tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
				},
				forkTsCheckerWebpackPluginOptions: {
					tsconfig: path.resolve(__dirname, '../tsconfig.json'),
				},
				include: [path.resolve(__dirname, '../src')],
			},
		},
	],
};
