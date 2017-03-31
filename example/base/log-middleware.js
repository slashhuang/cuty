


module.exports=(ctx,next)=>{

    console.log(`request comes in at ${Date.now()}`);
    next()

}