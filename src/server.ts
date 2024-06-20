import express, {Request, Response} from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatCompletion";
import cryptoRoute from './routes/crypto/crypto';
import cors from 'cors';


dotenv.config();
const app = express();
// middleware
app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
	res.send("welcome to gpt-backend");
});

// routes
app.use('/api/crypto', cryptoRoute);
app.use('/api/chat', chatRoute);

// server start
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
	console.log(`Server is up and running on ${PORT}`);
});


