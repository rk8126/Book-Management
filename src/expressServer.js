const {app}= require('./server')

app.get('/',(req,res)=>res.send("Book management service running successfully"))
app.use('/book', require('./route/bookRoute'))

module.exports = app