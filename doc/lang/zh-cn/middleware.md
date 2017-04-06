# how to write a middleware

cuty has super simple logic for developers to write a middleware.

a get-started middleware is like below.

```js

    let middleware  = (ctx,resolve,reject)=>{
        ctx.body = 'hello world';
        resolve()
    }

```

ctx is the context object for `request` and `response` handling.

when you call `resolve()`, the current cuty app middleware will be done and
the flow logic will go to the next middleware.

when you call `reject()`, the cuty app flow will be terminated and throw exception to `app.catch((exception)=>{})` which is very easy to handle exception.

