import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../Lib/axios";
import {
  LoaderIcon,
  PenSquareIcon,
  Trash2Icon,
  ArrowLeftIcon,
} from "lucide-react";

const NoteDetailPage = () => {
  // State to hold the note data
  const [note, setNote] = useState(null);
  // State to manage loading and saving states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get the note ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error in fetching:", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Handle delete note
  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };  
  
  const handleSave = async () => {
      if(!note.title.trim() || !note.content.trim()) {
        toast.error("Title and content are required.");
        return;
      }

      setSaving(true);

      // Save the note
      try {
        await api.put(`/notes/${id}`, note)
        toast.success("Note saved successfully");
        navigate("/");
      } catch (error) {
        console.log("Error saving note:", error);
        toast.error("Failed to save note");
      }
      finally{
        setSaving(false);
      }
  }
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // No note found
  if (!note) {
    return (
      <div className="text-center text-error py-10">Note not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Note Form */}
          <div className="card bg-base-100">
            <div className="card-body">
              {/* Title Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>
              <div className="card-actions justify-end">
                    <button className="btn btn-primary" disabled = {saving} onClick={handleSave}>
                      {saving ? (
                        <LoaderIcon className="animate-spin size-5" />
                      ) : (
                        "Save Note"
                      )}
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
