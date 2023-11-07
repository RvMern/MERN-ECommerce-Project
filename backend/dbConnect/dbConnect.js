const mongoose = require("mongoose");

// Database Connection
const dbConnect = async()=>{
  await mongoose.connect(process.env.MONGODB_ATLAS_URL,{useNewUrlParser:true, useUnifiedTopology:true})
   .then((data)=>{console.log(`Database Connected Successfully with server ${data.connection.host}`)})
}

module.exports = dbConnect;