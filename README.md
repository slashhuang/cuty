# Cuty

 Cuty project started on 17/3/31 , It is a Node.js framework driven by MVC and Middlewares.


# why have another `Cuty`


 As Node.js is a async/IO runtime, most of Node.js framework uses stream-like middlewares to

 frame apps. For example `koa` or `express`.

 These frameworks are great ,but also have several disadvantages.


 - stream-like middlewares are flattened but not structured.

 > app's shape is not suited when too many middlewares are arranged into the app.


 - Developers have to filter the handle logic to decide whethor or not to handle the logic.

 > middleware's role-play is flattened which leads to reduntant filter logic in each.


 Different from stream-like  middleware architecture,

 Cuty combines MVC and middleware workflow to build Node.js apps,

 Also,lifeCycle hook is integrated in each app which makes app building more robust.



# Cuty's zen

> you can reference the this doc to have an overview of Cuty

> [Cuty's zen](./doc/inspiration.md)


# install

```js
	npm install cuty
```

# changelog
> This repo will continue to update Cuty.

## copyright

slashhuang
