# <a href="../plugins.md">Plugins</a> → Share
When your plugin is ready, you can share it with all Cerebro users so they can find and install it using `plugins` command in Cerebro.

All you need is to publish your module to npm. Just run from your plugin folder:

```
npm publish ./
```

If you have any problems check out [publishing packages](https://docs.npmjs.com/getting-started/publishing-npm-packages) in npm documentation

## Checklist
1. Update your repository `Readme.md`, add screenshot or gif;
1. Push your plugin to open github repository – this repository is used by cerebro, at least to show `Readme.md` of your plugin;
1. Make sure that you have changed package.json metadata: module name, description, author and link to github repository;
1. Add `cerebro-plugin` keyword to package.json keywords section. Otherwise your plugin won't be shown in Cerebro;
