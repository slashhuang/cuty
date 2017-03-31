# Cuty

 Cuty project started on 17/3/31 , It is a Node.js framework driven by MVC and Middlewares.


# why have another `Cuty`


 As Node.js is an async/IO runtime, most of Node.js framework uses stream-like middlewares to

 frame apps.

 For instance `koa` or `express`.

 These frameworks are great ,but also have disadvantages listed below.

 1. stream-like middlewares are flattened without good structure.

 >  when too many middlewares are arranged into the app, the handle flow becomes perplexed.

 >  developers have to maintain each middleware's functionality while worrying about other middleware's logic



2. Developers have to filter the handle logic in each middleware without a Top-level structure.

 > middleware's role-play is flattened which leads to reduntant filter logic in each.

 > take `koa` For instance ,`koa-send` and `koa-router` actually handles logic seprately,

 > but they are framed in the same middleware queue, which leads to perplexed flow logic.


 Different from stream-like  middleware architecture,

 Cuty combines MVC and middleware workflow to make app building structured and streamed.

 Also,lifeCycle hook is integrated in each middleware to make app building more flexible and robust.

 Let's dive into `Cuty` to get more taste of it.

# Cuty's zen

> you can reference the this doc to have an overview of Cuty

> [Cuty's zen ](./doc/inspiration.md)


# install

```js
	npm install cuty
```

# changelog
> This repo will continue to update Cuty.

## copyright

slashhuang
