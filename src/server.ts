import express, {Request, Response} from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatCompletion";


dotenv.config();
const app = express();
// middleware
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
	res.send("welcome to gpt-backend");
});


// routes
app.use('/api', chatRoute);


// server start
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
	console.log("Server is up and running");
});


