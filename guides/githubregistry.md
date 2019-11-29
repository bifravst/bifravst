# Authenticate against the GitHub package registry

The Bifravst npm packages are hosted on the GitHub package registry and [npm needs to be authenticated against the regsitry](https://help.github.com/en/github/managing-packages-with-github-package-registry/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry) in order to download packages from it.

The gist is:

1. if you don't already have a free GitHub account, [create one](githubregistry.md)
2. create a personal access token with the `read:packages` scope
3. add the token to your `~/.npmrc` file:

   `//npm.pkg.github.com/:_authToken=PERSONAL-ACCESS-TOKEN`

