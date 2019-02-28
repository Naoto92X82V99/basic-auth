# Basic認証

## 初期設定
`package.json`に記載されたパッケージを一括インストール
```
npm install
```

## 起動コマンド

### 自動再起動なし
`src/index.js`を実行
```
node index.js
```

### 自動再起動あり
nodemonにより、自動再起動  
 `npm start` -> `cd src && nodemon index.js`
```
npm start
```
