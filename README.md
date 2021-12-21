# The scaffolded package

#### Includes:

-   :package: **esbuild**, an extremely fast JavaScript bundler
-   :test_tube: **jest**, a delightful JavaScript testing framework
-   :rotating_light: **eslint**, a tool for identifying and reporting on patterns in JavaScript
-   :lipstick: **prettier**, a tool for code formatting
-   :twisted_rightwards_arrows: **dotenv**, loads environment variables from a .env file into process.env
-   :rocket: automated semantic version releasing

#### Scripts:

-   `npm run build` _bundles your code with esbuild_
-   `npm run test` _runs the test suites with jest_
-   `npm run format` _formats the code with prettier_
-   `npm run lint` _check for linting error & apply fixes with es-lint_
-   `npm run release` _creates a gitHub tag and release, publishes to npm registry_
-   `npm run info` _lists the dependencies installed and the ones that are outdated_

#### Customization

The package uses the default `eslint:recommended` set of rules and few prettier rules.
You can customize both of them to your personal flavor.

-   es-lint [configuration](https://eslint.org/docs/user-guide/configuring/) and [rules](https://eslint.org/docs/rules/) docs
-   prettier [configuration](https://prettier.io/docs/en/configuration.html) and [options](https://prettier.io/docs/en/options.html) docs

#### Release automation

> The automated release is shipped from the package es-lint [@elieandraos/cli-tools](https://github.com/elieandraos/cli-tools#release-automation)

```shell
npm run release
```
