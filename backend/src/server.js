import express from 'express';
import connectDB from './database/db.js';
import notesRoutes from './routes/notes.routes.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());
app.use(rateLimiter)
app.use("/notes", notesRoutes);


connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

})