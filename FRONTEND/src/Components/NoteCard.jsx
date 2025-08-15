import { Link } from "react-router-dom"; // Corrected import from "react-router"
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../Lib/utils";
import toast from "react-hot-toast";
import api from "../Lib/axios";
// import { formatDate } from "../../utils/formatDate"; // Assuming you have a utility function for formatting dates
const NoteCard = ({ note , setNotes }) => {
    const handleDelete = async (e , id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully!");
        } catch (error) {
            if(error.response && error.response.status === 429) {
                toast.error("You are being rate limited. Please try again later.", {
                    duration: 5000,
                    icon: "🚫",
                });
                return;
            }
            console.log("Error deleting note");
            toast.error("Error deleting note. Please try again.");
        }
    };
  return (
    <Link to={`/note/${note._id}`}>
      <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formatDate(new Date(note.createdAt))}  
            </span>
            <div className="flex items-center gap-1">
                <button className="btn btn-xs text-while">
                  <PenSquareIcon className="size-4" />
                </button>
              <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
