import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routerNotes from "./Router/routesNotes.js";
import { connectDB } from "./Config/db.js";
import rateLimitMiddleware from "./Middleware/ratelimit.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Middleware it will allow to access the request body
const app = express(); 

app.use(cors( // Corrected the typo from 'cros' to 'cors'
    {origin: "http://localhost:5173",} // Adjust this to your frontend URL
));

app.use(express.json());
app.use(rateLimitMiddleware);
app.use("/api/notes", routerNotes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
    });
});