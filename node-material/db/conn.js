
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://julia:AtplXKm0VunfEw91@cluster0.0wxmh.mongodb.net/pitchProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;
module.exports = {
    connectToDatabase: function(callback) {
        client.connect(function(err,db){
            if (err|| !db){
                return callback(err);
            }
            dbConnection = db.db("pitchProject");
            console.log ("Connect to mongo Atlas");

            return callback();
        });
    },

    getDB: function(){
        return dbConnection;
    }

}
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
