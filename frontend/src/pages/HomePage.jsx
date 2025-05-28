import React from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import {useState, useEffect } from 'react'
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';
import axios from 'axios';
function HomePage() {

    const[isRateLimited, setIsRateLimited] = useState(false);
    const[notes,setNotes] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/notes');
                setNotes(res.data);
                setIsRateLimited(false);
                setIsLoading(false)
                console.log(res.data);
            } catch (error) {
                console.log(error);
                if(error.response?.status === 429){
                    setIsRateLimited(true);
                }else{
                    toast.error("Failed to fetch notes");
                }
            }finally{
                setIsLoading(false);
            }
        }

        fetchNotes();
    },[])
  return (
    
    <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto px-4 mt-6">
         {!setIsLoading && <div className="text-center text-primary py-10 text-2xl">Loading...</div>}

         {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map(note => (
                <NoteCard key={note.id} note={note} />
                ))}
            </div>
         )}
        </div>
    </div>
  )
}

export default HomePage