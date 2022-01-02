const express = require ('express');
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express ();
const port = process.env.PORT ||5000

// middleware
app.use(cors(''));
app.use(bodyParser.json())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ln4sk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);
async function run() {
    try {
      await client.connect();
      const database = client.db("Farm");
      const daysCollection = database.collection("days");
      // create a document to insert
      const doc = [
        {day1: 1, Carp: 0, Catfish: 5, Koi: 0.25, Pangasius: 30, Tilapia: 20},
        {day15: 15, Carp: 5, Catfish: 7, Koi: 5, Pangasius: 79, Tilapia: 35},
        {day30: 30, Carp: 15, Catfish: 9.5, Koi: 10, Pangasius: 133, Tilapia: 55},
        {day45: 45, Carp: 25, Catfish: 12.5, Koi: 20, Pangasius: 196, Tilapia: 80},
        {day60: 60, Carp: 55, Catfish: 17, Koi: 35, Pangasius: 265, Tilapia: 110},
        {day75: 75, Carp: 95, Catfish: 22, Koi: 55, Pangasius: 343, Tilapia: 150},
        {day90: 90, Carp: 150, Catfish: 27, Koi: 80, Pangasius: 430, Tilapia: 200},
        {day105: 105, Carp: 210, Catfish: 33, Koi: 110, Pangasius: 523, Tilapia: 260},
        {day120: 120, Carp: 175, Catfish: 39, Koi: 150, Pangasius: 616, Tilapia: 330},
        {day135: 135, Carp: 350, Catfish: 45, Koi: 150, Pangasius: 712, Tilapia: 405},
        {day150: 150, Carp: 430, Catfish: 45, Koi: 150, Pangasius: 808, Tilapia: 490},
        {day165: 165, Carp: 515, Catfish: 45, Koi: 150, Pangasius: 904, Tilapia: 585},
        {day180: 180, Carp: 610, Catfish: 45, Koi: 150, Pangasius: 1000, Tilapia: 700},
    ]
      app.get('/',async (req,res)=>{
        const cursor = daysCollection.find({
          // day: 'Rui'
          // status: { $in: ['A', 'D'] }
        });
        const day = await cursor.toArray();
        res.send(day);
      });
    
     
      const result = await daysCollection.insertMany(doc);
      
    } 
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);


// client.connect(err => {
//   const collection = client.db("Farm").collection("Temparature");
//   // perform actions on the collection object
//   console.log("Hitting the database");
//   const temparature = [
//     {
//       temp: ">36",
//       reductionQty: "30%"
//     },
//     {
//       temp: "33-36",
//       reductionQty: "20%"
//     },
//     {
//       temp: "25-28",
//       reductionQty: "20%"
//     },
//     {
//       temp: "22-25",
//       reductionQty: "30%"
//     },
//     {
//       temp: "18-22",
//       reductionQty: "50%"
//     },
//     {
//       temp: "<18",
//       reductionQty: "70%"
//     }
//   ]
//   collection.insertMany(temparature)
//   .then(()=>{
//       console.log("insert success");
//   })
// //   client.close();
// });

app.post('/', (req,res)=>{
  res.send('This is home page with post request')
})

app.listen(port, ()=>{
    console.log('Running Server on port', port)
})
