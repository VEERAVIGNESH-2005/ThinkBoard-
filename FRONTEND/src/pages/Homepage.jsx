import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI'
import { toast } from 'react-hot-toast';
import NoteCard from '../Components/NoteCard';
import api from '../Lib/axios';
import NoteNotFound from '../Components/NoteNotFound';



const Homepage = () => {
    const [isRateLimited , setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchNotes = async () => {
    try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        console.log("Notes fetched successfully:", res.data);
    } catch (error) {
      console.log("Error fetching notes");
      console.error(error);
      if(error.response && error.response?.status === 429) {
          setIsRateLimited(true);
        }
        else {
            // Pass a user-friendly string message instead
            toast.error("Error fetching notes. Please try again.");
        }
    }
    finally {
      setLoading(false);
    }
  }

  fetchNotes();
}, []);
    
  return (
    <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
        

                <div className= "max-w-7xl mx-auto p-4 mt-6" >
                    {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
                

                    {notes.length > 0 && !isRateLimited &&(
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "> 
                                {notes.map(notes => (
                                    <div>
                                        <NoteCard key={notes._id} note={notes} setNotes = {setNotes}/>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            {notes.length === 0 && !isRateLimited &&  <NoteNotFound />}
            
    </div>
  )
}

export default Homepage