# Cuty

 Cuty project started on 17/3/31 , It is a Node.js framework driven by MVC and Middlewares.

 In Cuty's development , I adopted a lot of ideas from koa and express.

 Basically, Cuty combines the advantage of MVC and middleware-flow to shape Node.js application.

## Cuty's features

 1. Cuty helps you to build MVC and middleware workflow Node apps.

 2. LifeCycle hook is integrated in Cuty to facilitate app's flexibility.

 3. Cuty is Completely compatible with Koa's 3rd party middlewares,which means that koa apps can easily migrate to Cuty


# install

```js
	npm install cuty
```

# Usage

```js

    const Cuty = require('cuty');
    const app = new Cuty();
    //middleware
    app.use([(ctx,next) => {
      ctx.body = 'Hello Koa';
      next()
    }]);
    http.createServer(app.callback()).listen(3000);

```



# Comparison with express and Koa

> you can reference the this doc to have an overview comparion.

> [Comparison with Other Frameworks ](./doc/comparison.md)

# changelog

> This repo will continue Cuty's development.

## copyright

slashhuang


