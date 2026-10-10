import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());
app.use("/api/employee",employeeRoutes);
app.use( (err,req,res,next) => {
    const statusCode = err.statusCode || 5000;

    const message  = err.message || "Internal Server Error";

    return err.status(statusCode).json({
        error : message
    });

})


app.get("/" , (req,res) => {


    res.send("Api is Working");
})

app.listen(process.env.PORT , ()=> {
    console.log(`Server running on port :  ${process.env.PORT}`);
});