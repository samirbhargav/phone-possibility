
module.exports =(app) =>{
    const handler = require('./handler');
    app.get('/process', handler.process)
}