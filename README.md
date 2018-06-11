# nativescript-hook-env-files
NODE_ENVの値によって読み込むファイルを変更するためのフック

## Usages
`filename.[NODE_ENV].ext`というファイルを作ると`filename.ext`の代わりに使用される
対象ファイルを使う場合は`filename.ext`を読み込むだけで良い
