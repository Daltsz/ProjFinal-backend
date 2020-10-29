const MongoClient = require("mongodb").MongoClient;


module.exports =  class User{

    static async find(email){
        
        const conn = await MongoClient.connect("mongodb://127.0.0.1:27017/"),
            db = conn.db("ProjFinal");
        if(email)
            return await db.collection("Users").find({email: email}).toArray();    

    }


    static async findLogin(value){
        const conn = await MongoClient.connect("mongodb://127.0.0.1:27017/"),
            db = conn.db("ProjFinal");
        if(value){
            return await db.collection("Users").find({email: value.email, password: value.password}).toArray();    
        }

    }



    static async findWord(word){
        const conn = await MongoClient.connect("mongodb://127.0.0.1:27017/"),
            db = conn.db("ProjFinal");
        if(word){
            return await db.collection("words").find({word: word}).toArray();    
        }

    }


    static async insert(user){
        const conn = await MongoClient.connect("mongodb+srv://deploy:deploy123@cluster0.wr7qj.mongodb.net/ProjFinal?retryWrites=true&w=majority"),
            db = conn.db("ProjFinal");
        db.collection('Users').insertOne({first_Name: user.first_Name, last_name: user.last_name, email: user.email, password: user.password});
    }

}