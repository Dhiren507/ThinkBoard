import { PenSquareIcon, Trash2Icon, CalendarIcon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const NoteCard = ({ note, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate a small delay for staggered animation based on index
    const animationDelay = `${Math.min(index * 0.1, 0.5)}s`;
    
    return (
        <Link 
            to={`/note/${note._id}`} 
            className="card bg-base-100 hover:shadow-xl transition-all duration-300 border-t-4 border-solid border-primary animate-slide-up"
            style={{ 
                animationDelay,
                transformOrigin: 'center bottom'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-body relative overflow-hidden group">
                {/* Category indicator (if you have categories) */}
                {note.category && (
                    <div className="badge badge-sm badge-primary absolute top-2 right-2">
                        {note.category}
                    </div>
                )}
                
                <h3 className="card-title text-base-content mb-0 group-hover:text-primary transition-colors">
                    {note.title}
                </h3>
                
                <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
                    <CalendarIcon className="size-3" />
                    <span>{formatDate(new Date(note.createdAt))}</span>
                </div>
                
                <p className="text-base-content/70 line-clamp-3 mt-2">{note.content}</p>
                
                <div className="card-actions justify-end items-center mt-4 pt-2 border-t border-base-content/10">
                    <div className={`flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
                        <button className="btn btn-ghost btn-xs btn-circle" title="Edit">
                            <PenSquareIcon className="size-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs btn-circle text-error" title="Delete">
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard