const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const cors = require('cors')
const url = "mongodb://localhost:27017"
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/insert', async (req,res) => {
    console.log(req.body)
    try{
    const client = await  mongodb.connect(url)
    const db = client.db("movie-imdb")
    const data = await db.collection("movie").insertOne(req.body) 
        console.log(data)
        await client.close()
        res.json({message : "added" }) 
    }
        catch(err){
            res.json({message : err.message })
        }
})

app.get('/movies', async (req,res) => {
   
    try{
    const client = await  mongodb.connect(url)
    const db = client.db("movie-imdb")
    const data = await db.collection("movie").find().toArray()
      //  console.log(data)
        await client.close()
        res.json({movies : data }) 
    }
        catch(err){
            res.json({message : err.message })
        }
})

app.get('/search', async (req,res) => {
   let searchObj;
    if(req.query.opt === "title"){
        searchObj = {title : req.query.title}
    }
    else {
        searchObj = {_id : mongodb.ObjectID(req.query.title) }
    }
    console.log(searchObj)
    try{
    const client = await  mongodb.connect(url)
    const db = client.db("movie-imdb")
    const data = await db.collection("movie").findOne(searchObj)
      //  console.log(data)
        await client.close()
        res.json({movies : data }) 
    }
        catch(err){
            res.json({message : err.message })
        }
})

app.get('/removeall', async (req,res) => {
   
    try{
    const client = await  mongodb.connect(url)
    const db = client.db("movie-imdb")
    const data = await db.collection("movie").remove({})
      //  console.log(data)
        await client.close()
        res.json({message : data }) 
    }
        catch(err){
            res.json({message : err.message })
        }
})






app.listen(4040 , () => {
    console.log("Listening at 4040...")
})

