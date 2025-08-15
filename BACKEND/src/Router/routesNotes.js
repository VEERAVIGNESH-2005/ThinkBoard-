import express from "express";
import { getallnote, createnote, updatenote, deletenote , getNoteById } from "../Controller/Notescontroller.js";

const router = express.Router();

router.get("/" , getallnote);

router.get("/:id" , getNoteById);

router.post("/" , createnote);

router.put("/:id" , updatenote);

router.delete("/:id" , deletenote);

export default router;