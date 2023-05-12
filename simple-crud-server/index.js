const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;

//middleware's

app.use(cors());
app.use(express.json());

// asikthe1st
//N0VB59bz8jKeLc3A

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD is running");
});

// Data added from mongodb

const uri =
  "mongodb+srv://asikthe1st:N0VB59bz8jKeLc3A@cluster0.llfgq6f.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const database = client.db("usersDB");
const userCollection = client.db("usersDB").collection("userCollection");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.get("/users", async (req,res) => {
      const cursor = userCollection.find();
      const results = await cursor.toArray();
      res.send(results)
    })

    app.get('/users/:id', async(req,res)=> {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await userCollection.findOne(query);
      res.send(result)
    })
    app.put('/users/:id',async(req,res)=> {
      const id = req.params.id;
      const userBody = req.body;
      const filter = { _id : new ObjectId(id)}
      const options = { upsert : true}
      const updateUser = {
        $set:{
          name: userBody.name,
          email: userBody.email
        }
      }
      const results = await userCollection.updateOne(filter,updateUser,options)
      res.send(results)
    })

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      const result = await userCollection.insertOne(user);
      res.send(result)
    });

    app.delete("/users/:id", async(req,res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id : new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result)

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// ends here

app.listen(port, () => {
  console.log(`SIMPLE CRUD listening to the port: ${port}`);
});
