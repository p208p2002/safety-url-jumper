# React deploy server
for React deploy
- 404 redirect to `index.html`
- static resouce access

## Runtime require
- node : 10.16.3
- npm : 6.9.0

## First use
```
npm install
```

## Normal use
```
node server.js
```

## Run as background
```
forever start server.js
```
stop server
```
forever list
forever stop 0
```