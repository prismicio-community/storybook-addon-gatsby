import { Configuration as WebpackConfiguration } from "webpack";

/**
 * Options for the addon.
 */
interface AddonOptions {
	/**
	 * Determines if TypeScript support is included.
	 *
	 * @default true
	 */
	withTypescript?: boolean;
}

/**
 * This adds a file necessary to make the preview environment compatible with Gatsby.
 *
 * @param entries Existing entries
 * @param options Options specific to this addon.
 *
 * @returns `entries` with the Gatsby-specific configuration.
 */
export const config = (
	entries: string[] = [],
	_options: AddonOptions,
): string[] => {
	return [...entries, require.resolve("./preview.mjs")];
};

/**
 * This modifies the Webpack configuration to simulate Gatsby's internal Webpack configuration. It is derived from Gatsby's Visual Testing with Storybook guide and a collective effort of Gatsby users.
 *
 * {@link https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/}
 * {@link https://github.com/gatsbyjs/gatsby/issues/26099}
 *
 * @param config The incoming Webpack configuration object.
 * @param options Options specific to this addon.
 *
 * @returns `config` modified to simulate Gatsby's internal Webpack configuration.
 */
export const webpack = (
	config: WebpackConfiguration,
	rawOptions: AddonOptions,
): WebpackConfiguration => {
	// Set default options.
	const options = {
		// It doesn't hurt to include TypeScript support by default. If it
		// conflicts with a user's setup, it can be disabled with this option.
		withTypescript: true,
		...rawOptions,
	};

	const babelPlugins = [
		// use @babel/plugin-proposal-class-properties for class arrow functions
		require.resolve("@babel/plugin-proposal-class-properties"),
		// use @babel/plugin-proposal-optional-chaining since Webpack 4 doesn't understand optional chaining
		require.resolve("@babel/plugin-proposal-optional-chaining"),
		// use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
		[
			require.resolve("babel-plugin-remove-graphql-queries"),
			{
				stage: config.mode === `development` ? "develop-html" : "build-html",
				staticQueryDir: "page-data/sq/d",
			},
		],
	];

	if (typeof config.module?.rules?.[0] === "object") {
		// Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
		config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

		if (Array.isArray(config.module.rules[0].use)) {
			if (typeof config.module.rules[0].use[0] === "object") {
				// use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
				config.module.rules[0].use[0].loader = require.resolve("babel-loader");

				// use @babel/preset-react for JSX and env (instead of staged presets)
				if (typeof config.module.rules[0].use[0].options === "object") {
					config.module.rules[0].use[0].options.presets = [
						require.resolve("@babel/preset-react"),
						require.resolve("@babel/preset-env"),
					];

					config.module.rules[0].use[0].options.plugins = babelPlugins;
				}
			}
		}
	}

	// Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
	if (config.resolve) {
		config.resolve.mainFields = ["browser", "module", "main"];
	}

	// Add TypeScript support if enabled
	if ((options.withTypescript ?? true) === true) {
		config.module?.rules?.push({
			test: /\.(ts|tsx)$/,
			loader: require.resolve("babel-loader"),
			options: {
				presets: [["react-app", { flow: false, typescript: true }]],
				plugins: babelPlugins,
			},
		});

		config.resolve?.extensions?.push(".ts", ".tsx");
	}

	return config;
};
