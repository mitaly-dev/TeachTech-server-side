const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.get('/',(req,res)=>{
    res.send('iam running in server')
})

app.get('/courses',(req,res)=>{
    res.send('course is continue in port')
})

app.listen(port,()=>{
    console.log(`TeachTech is running in port ${port}`)
})