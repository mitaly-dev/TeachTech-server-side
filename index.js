const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const stripe = require("stripe")('sk_test_51M6CE4BMtIhTvUhsjjwowd0TVare61yEtFADEVCRP3q3DxrbgtOI2XNnvvFeGsal680QelErzCop5KDlbIoNQfHr002idxqSLh');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const courses = require('./Data/courses.json')
const blogs = require('./Data/blog.json')


const uri = "mongodb+srv://TeachTech:xt0WKoY46Hq3qQaE@cluster0.ojtfupc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const paymentsCollection = client.db('TeachTech').collection('payments')
        
        app.post("/create-payment-intent",async(req,res)=>{
            const payment = req.body
            console.log(payment)
            const price = payment.price 
            const amount = price*100
    
            const paymentIntent = await stripe.paymentIntents.create({
                amount:amount,
                currency: "usd",
                payment_method_types: [
                    "card"
                  ],
            })
            res.send({
              clientSecret: paymentIntent.client_secret,
            });
          });

        
        app.post('/payments',async(req,res)=>{
            const payment = req.body
            const result = await paymentsCollection.insertOne(payment)
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(error=>console.log(error))



// all courses
app.get('/courses',(req,res)=>{
    res.send(courses)
})

// get single course details
app.get('/courses/:id',(req,res)=>{
    const id=req.params.id
    const course = courses.find(singleCourse=>singleCourse.id===id)
    res.send(course)
})

// get course info for primium access
app.get('/primium_access/:id',(req,res)=>{
    const id=req.params.id
    const course = courses.find(singleCourse=>singleCourse.id===id)
    res.send(course)
})

// get all blogs data
app.get('/blogs',(req,res)=>{
    res.send(blogs)
})

app.listen(port,()=>{
    console.log(`TeachTech is running in port ${port}`)
})