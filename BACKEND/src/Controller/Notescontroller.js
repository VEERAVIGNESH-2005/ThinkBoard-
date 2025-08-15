import Note from "../Model/Note.js";

export async function getallnote(req , res) {
    try {
        const notes = await Note.find().sort( { createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error fetching note by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createnote(req , res) {
    try {
        const { title , content } = req.body;
        const newNote = new Note({title , content});
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log("Error creating note:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updatenote(req , res) {
    try {
        const {title, content} = req.body;
        const updateddate = await Note.findByIdAndUpdate(req.params.id , {title, content}, {new: true});
        if (!updateddate) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note updated successfully", updateddate});
    } catch (error) {
        console.log("Error updating note:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deletenote(req ,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        }   
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.log("Error deleting note:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}