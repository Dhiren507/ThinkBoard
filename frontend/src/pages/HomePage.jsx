import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import WelcomeMessage from "../components/WelcomeMessage";
import FloatingActionButton from "../components/FloatingActionButton";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);  const { user } = useAuth();
  
  // Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingActionButton />

      {isRateLimited && <RateLimitedUI />}      <div className="max-w-7xl mx-auto p-4 mt-6">
        {!loading && showWelcome && notes.length === 0 && (
          <WelcomeMessage 
            userName={user?.name} 
            onDismiss={() => setShowWelcome(false)} 
          />
        )}
        
        {loading && <LoadingSpinner message="Loading your notes..." />}        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;