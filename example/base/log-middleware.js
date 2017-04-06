


module.exports=(ctx,next)=>{

    console.log(`\nrequest comes in at ${Date.now()}`);
    next()

}