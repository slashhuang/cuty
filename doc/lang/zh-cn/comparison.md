## 相比于koa和express

## 历史的演进`koa`和`express`

在Node.js应用中，我们已经有了有名的框架。比如`express`和`koa`.

它们都拥有很好的框架设计思路。 比如`express`在设计思路上围绕着`routes`展开，流程的展开围绕中间件和路由两个核心点。
而`koa`框架是`express`的升级版，它为开发者提供了中间件和属性代理，去除了`routes`的侵入，整个流程仅仅围绕中间件展开。
由于`express`和`koa`是同一个开发团队，在框架设计上能够看到思路上的一脉相承。

## `koa`的一些瑕疵

`koa`的中间件的流转完全依赖`next`函数，由于中间件的流转策略采用`koa-compose`。因此整个`koa`流程按照如下形式展开。





of course ,Koa's zen is super simple and easy to understand. But, as a `Koa` developer, I always have to search the `Koa` doc to find `ctx.body ctx.status etc` properties which is not an easy job for newcomers.

Also, koa's middleware workflow using `koa-compose` is a straight-forward uni-direction control flow. middleware shape will always be  flatten but not structured in this way which is actually violative to develpers' thought.


 # Comparison with Other Frameworks

 As Node.js is an async/IO runtime, most of Node.js framework uses stream-like middlewares to

 frame apps.

 For instance `koa` or `express`.

 These frameworks are great ,but also have disadvantages listed below.

 1. stream-like middlewares are flattened without good structure.

 >  when too many middlewares are arranged into the app, the handle flow becomes perplexed.
 >  developers have to maintain each middleware's functionality while worrying about other middleware's logic


2. Developers have to filter the handle logic in each middleware without a Top-level structure.

 > middleware's role-play is flattened which leads to reduntant filter logic in each.
 > take `koa` For instance,`koa-send` and `koa-router` actually stays in parallel position in Node app which means one request can only be flowed into one of them to handle logic.
 > but they are framed in the same middleware queue in `koa`, which leads to perplexed flow logic.







