import pg from "pg";
import { Pool } from "pg";
import env from "dotenv";

env.config();

const db = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {require : true}
});

db.connect()
    .then( () => {
        console.log("Database is Connected")
    })
    .catch( (err) => {
        console.log("Error while connecting Database",err);
        process.exit(1);
    });

db.on("error" , (err) => {
    console.log("DB error : ",err);
});

export const query = (text,params) => db.query(text,params);