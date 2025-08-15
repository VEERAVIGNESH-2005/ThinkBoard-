import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import routerNotes from "./Router/routesNotes.js";
import { connectDB } from "./Config/db.js";
import rateLimitMiddleware from "./Middleware/ratelimit.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Ensure __dirname is defined correctly

// Middleware it will allow to access the request body
const app = express(); 
if(process.env.NODE_ENV !== "production"){
        app.use(cors( // Corrected the typo from 'cros' to 'cors'
            {origin: "http://localhost:5173",} // Adjust this to your frontend URL
        ));
}

app.use(express.json());
app.use(rateLimitMiddleware);
app.use("/api/notes", routerNotes);
        if(process.env.NODE_ENV === "production") {
            
        app.use(express.static(path.join(__dirname, "../FRONTEND/dist"))); // Corrected 'joid' to 'join'
        app.get("*" , (req, res) => {
            res.sendFile(path.join(__dirname, "../FRONTEND/dist/index.html")); // Corrected 'joid' to 'join'
        });
    }
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
    });
});