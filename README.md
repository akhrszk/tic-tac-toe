# Tic-Tac-Toe

React-Reduxで作ったTic-Tac-Toe

![screen shot](https://github.com/akhrszk/tic-tac-toe/blob/images/screen_shot.png)

## 技術スタック

* [create-react-app](https://github.com/facebook/create-react-app)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [TypeScript](https://www.typescriptlang.org/)

## ディレクトリ構造

```
src
├── app
│   ├── App.css
│   ├── App.tsx
│   └── store.ts
├── core
│   ├── game.test.ts
│   └── game.ts
├── domain
│   ├── mark.ts
│   └── player.ts
├── features
│   ├── board
│   │   ├── Board.module.css
│   │   ├── Cell.tsx
│   │   ├── Table.tsx
│   │   ├── board.ts
│   │   └── boardSlice.ts
│   ├── history
│   │   ├── History.module.css
│   │   ├── MoveList.tsx
│   │   ├── history.ts
│   │   └── historySlice.ts
│   └── status
│       ├── Status.module.css
│       ├── Status.tsx
│       └── statusSlice.ts
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── serviceWorker.ts
└── setupTests.ts
```

## 実行方法

```
$ git clone git@github.com:akhrszk/tic-tac-toe.git
$ cd tic-tac-toe
$ yarn start
```
