import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const URL:string = process.env.URL ?? "";

const app = express();

app.use(cors());


app.get("/memes", async (req: express.Request, res:express.Response)=>{
    
    //fetch the memes 
    try{
        const response = await fetch(URL)
        const data = await response.json();
        res.status(200).json(data);
        return;

    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
        res.status(500).json({
            "message" : "internal server error"
        })
        return;
    }

    
})

app.listen(PORT,()=>{
    console.log("app is running on port :" + PORT )
})
