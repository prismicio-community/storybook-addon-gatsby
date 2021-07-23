import { Configuration as WebpackConfiguration } from "webpack";

/**
 * Options for the addon. There are no options.
 */
type AddonOptions = Record<string, never>;

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
export const webpackFinal = (
	config: WebpackConfiguration,
	_options: AddonOptions,
): WebpackConfiguration => {
	if (typeof config.module?.rules?.[0] === "object") {
		// Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
		config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

		if (
			Array.isArray(config.module.rules[0].use) &&
			typeof config.module.rules[0].use[0] === "object" &&
			typeof config.module.rules[0].use[0].options === "object"
		) {
			// use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
			config.module.rules[0].use[0].options.plugins.push(
				require.resolve("babel-plugin-remove-graphql-queries"),
			);
		}
	}

	return config;
};
