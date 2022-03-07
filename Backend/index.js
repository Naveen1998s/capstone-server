const port=4000
const app=require('./app.js')
const logger=require('./config/logger')

app.listen(port, ()=>{
    logger.info(`The server is listening on port ${port}`);
})