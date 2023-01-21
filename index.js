const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewar
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://fahad:On7Mlzn3PULMu0FX@cluster0.3gbyspq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    const lettyCollection = client.db('latty').collection('lattyText');
    
    app.post("/text", async (req, res) => {
        const text = req.body;
        const result = await lettyCollection.insertOne(text)
        res.send(result);
        
    })

    app.get("/text", async (req, res) => {
        const query = {};
        const cursor = lettyCollection.find(query);
        const texts = await cursor.toArray();
        res.send(texts)
    });

    app.get("/text/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id : ObjectId(id)};
        const text = await lettyCollection.findOne(query);
        res.send(text);
    })

}
run().catch(err => console.error(err));




app.get("/", (req, res) => {
    res.send("server is listening");
})
app.listen(port, ()=>{
    console.log(`Listing on port ${port}`);
});