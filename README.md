# storybook-addon-gatsby

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Conventional Commits][conventional-commits-src]][conventional-commits-href]
[![License][license-src]][license-href]

[Storybook][storybook] addon used to load stories built with [Gatsby][gatsby].

**Note**: This addon requires Storybook to be configured for Webpack 5. See the official [Storybook with Webpack 5 guide](https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324) for instructions.

## Install

```bash
npm install --save-dev storybook-addon-gatsby
```

Then include the addon to your Storybook config at `.storybook/main.js`:

```javascript
// .storybook/main.js

module.exports = {
	addons: ["storybook-addon-gatsby"],
};
```

## License

```
   Copyright 2013-2021 Prismic <contact@prismic.io> (https://prismic.io)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

<!-- Links -->

[prismic]: https://prismic.io
[storybook]: https://storybook.js.org/
[gatsby]: https://www.gatsbyjs.com/

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/storybook-addon-gatsby/latest.svg
[npm-version-href]: https://npmjs.com/package/storybook-addon-gatsby
[npm-downloads-src]: https://img.shields.io/npm/dm/storybook-addon-gatsby.svg
[npm-downloads-href]: https://npmjs.com/package/storybook-addon-gatsby
[github-actions-ci-src]: https://github.com/prismicio-community/storybook-addon-gatsby/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/prismicio-community/storybook-addon-gatsby/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/prismicio-community/storybook-addon-gatsby.svg
[codecov-href]: https://codecov.io/gh/prismicio-community/storybook-addon-gatsby
[conventional-commits-src]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-href]: https://conventionalcommits.org
[license-src]: https://img.shields.io/npm/l/storybook-addon-gatsby.svg
[license-href]: https://npmjs.com/package/storybook-addon-gatsby
