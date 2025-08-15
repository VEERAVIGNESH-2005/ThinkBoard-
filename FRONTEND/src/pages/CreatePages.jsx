
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"; // Corrected import from "react-router"
import api from "../Lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

        if(!title.trim() && !content.trim()) {
        toast.error("Title and content are required.");
        return;
        }   
        if(!title.trim())
        {
            toast.error("Title is required.");
            return;
        }
        if(!content.trim())
        {
            toast.error("Content is required.");
            return;
        }

    setLoading(true)
    // Create a new note
    try {
        await api.post("/notes", {
            title,
            content,
        })
        toast.success("Note created successfully!");
        Navigate("/");
    } catch (error) {
        if(error.response && error.response.status === 429) {
            toast.error("You are being rate limited. Please try again later.",{
                duration: 5000 , 
                icon: "🚫",
            }
            );
        }
        else
        {
            console.log("Error creating note");
            toast.error("Error creating note. Please try again.");
        }
    }
    finally {
        setLoading(false);
        setTitle("");
        setContent("");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

            <div className="card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                            <span className="label-text">Title</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Note Title"
                            className="input input-bordered"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                            <span className="label-text">Content</span>
                            </label>
                            <textarea
                            placeholder="Write your note here..."
                            className="textarea textarea-bordered"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="5"
                            ></textarea>
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                             {loading ? "Creating..." : "Create Note"}   
                            </button>
                        </div>
                    </form>
                </div>
                </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;