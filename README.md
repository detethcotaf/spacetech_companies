# Init docusaurus dir

```
$ npx @docusaurus/init@latest init spacetech-companies classic
```

```
git init
git branch -M main
git config --local user.email "you@example.com"
git config --local user.name "${YOUR_GITHUB_USERNAME}"
git add .
git commit -m "Initial commit"
git remote add origin $YOUR_HOST_ALIAS:$YOUR_GITHUB_USERNAME/$YOUR_REPOSITORY_NAME.git
git push --set-upstream origin main
```

# 運用

- `docs/`にドキュメントを用意する
- 開発環境で確認する
    - yarnコマンドがある状態で、ルートディレクトリ（.yarnがあるディレクトリ）にて`yarn start --port XXXX`を実行する
    - 実行結果として表示されるログにURLが記載されているので、そこにアクセスする
    - markdownの見た目を確認する
- mainブランチにgit pushすればCICDが稼働し、自動的にGitHub Pagesを更新してくれる


# Reference

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

specified port

```
$ yarn start --port 3333
```

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
