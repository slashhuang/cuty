# interceptor

 cuty's middleware can have interceptor to perform flow conditions

 A base middleware for cuty is like below

```js

	let apiMiddleware = (ctx,resolve,reject)=>{
		ctx.body = 'hello world'
		resolve()
	}

```

if developers want to filter url to decide `apiMiddleware` flow logic.

then `interceptor` is the way.

```js
	apiMiddleware.interceptor=(ctx,flow,cross)=>{
		if(ctx.url.match('html')){
			//flow to  apiMiddleware logic
			flow()
		}else{
			//pass apiMiddleware logic
			cross()
		}	
	}

```

