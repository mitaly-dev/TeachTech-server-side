const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
const courses = require('./Data/courses.json')
const blogs = require('./Data/blog.json')

app.get('/courses',(req,res)=>{
    res.send(courses)
})

app.get('/courses/:id',(req,res)=>{
    const id=req.params.id
    const course = courses.find(singleCourse=>singleCourse.id===id)
    res.send(course)
})

app.get('/primium_access/:id',(req,res)=>{
    const id=req.params.id
    const course = courses.find(singleCourse=>singleCourse.id===id)
    res.send(course)
})

app.get('/blogs',(req,res)=>{
    res.send(blogs)
})

app.listen(port,()=>{
    console.log(`TeachTech is running in port ${port}`)
})