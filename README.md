# nativescript-hook-env-files
A nativescript hook to replace file according to NODE_ENV value.
Inspired by [nativescript-hook-debug-production](https://github.com/markosko/nativescript-hook-debug-production)

## Example
Project directory structure
```
app
├ env.development.json # {"production": false}
├ env.production.json  # {"production": true}
├ main.ts
├ ...
```
In your app code
```
const env = require('./env.json');

console.log(env.production); // 'true' if tns build or run with NODE_ENV=production, otherwise 'false'.
```

## Webpack+Angular support
Add `hostReplacementPaths` option to `NativescriptAngularCompilerPlugin` in your `webpack.config.js`.
```
// utility method for getting replacement targets.
const { getReplacementPaths } = require('nativescript-hook-env-files/webpack');
```
```
new nsWebpack.NativeScriptAngularCompilerPlugin({
    entryModule: resolve(appPath, "app.module#AppModule"),
    tsConfigPath: join(__dirname, "tsconfig.esm.json"),
    skipCodeGeneration: !aot,
    platformOptions: {
        platform,
        platforms,
    },
    hostReplacementPaths: getReplacementPaths(appFullPath, process.env.NODE_ENV || 'development'), // add this line
}),

```
