var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(4000, () => {
    console.log("app is running in local server at port 4000")
})

app.get('/', (req, res) => { 
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // console.log("Database connected!");
        var dbo = db.db("quikie").collection("Cryptocurrency")

        dbo.find({}).toArray()
        .then(response =>{ 
            console.log(response)
            res.json({message:response})
        })
        .catch(err => console.log(err))

    });
})

app.post('/', (req, res) => {
    const responseData = req.body.e
    console.log(req.body.e)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // console.log("Database connected!");
        var dbo = db.db("quikie").collection("Cryptocurrency")

        dbo.insertOne(responseData)
        .then(response =>{
            console.log(response.result)
            if(response.result.n=1){

                res.json({message:"data is saved"})
            }
        })
        .catch(err => console.log(err))

    });
    // res.send("post hitted")
})


app.delete('/',(req,res)=>{
    console.log("Requse from delet")
    const requestData = req.body.element
    console.log(requestData)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // console.log("Database connected!");
        var dbo = db.db("quikie").collection("Cryptocurrency")

        dbo.deleteOne({id:requestData.id})
        .then(response =>{
            console.log(response.deletedCount)
            if(response.deletedCount==1){
                res.json({message:"data is deleted"})
            }
            else{
                res.json({message:"data is not there"})
            }
        })
        .catch(err => console.log(err))

    });
    // res.send("delet router hitted")

})


