import express from "express";
import cors from "cors";
import { response1 } from "./src/responses";

const PORT = process.env.PORT;
//const URL:string = process.env.URL ?? "";

const app = express();

app.use(cors());


app.get("/memes", async (req: express.Request, res:express.Response)=>{

    const data1 = response1;
    
    res.status(200).json(data1);
    return;

})

app.listen(PORT,()=>{
    console.log("app is running on port :" + PORT )
})
