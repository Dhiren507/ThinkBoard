import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon, LogOutIcon, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [greeting, setGreeting] = React.useState("");
      // Function to get appropriate greeting based on time of day
    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return "Rise & shine,";
        } else if (hour >= 12 && hour < 16) {
            return "Hello there,";
        } else if (hour >= 16 && hour < 19) {
            return "Good evening,";
        } else if (hour >= 19 && hour < 23) {
            return "Creative night,";
        } else {
            return "Night owl,";
        }
    };
    
    // Update greeting on component mount and every hour
    React.useEffect(() => {
        const updateGreeting = () => {
            setGreeting(getTimeBasedGreeting());
        };
        
        // Set initial greeting
        updateGreeting();
        
        // Update greeting every hour
        const intervalId = setInterval(updateGreeting, 60 * 60 * 1000);
        
        // Clear interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">ThinkBoard</h1>                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="bg-base-100 px-3 py-1.5 rounded-lg shadow-sm">
                                    <span className="text-sm">
                                        <span className="font-bold text-primary">{greeting}</span>
                                        <span className="ml-1 font-medium">{user.name}</span>
                                        <span className="ml-1 text-xs opacity-70">✨</span>
                                    </span>
                                </div>
                                <Link to="/create" className="btn btn-primary">
                                    <PlusIcon className="size-5"/>
                                    <span>New Note</span>
                                </Link>
                                <Link to="/thinkmate" className="btn btn-secondary">
                                    <Sparkles className="size-5"/>
                                    <span>ThinkMate</span>
                                </Link>                                <div className="flex items-center gap-2">
                                    <ThemeToggle />
                                    <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                                        <LogOutIcon className="size-4"/>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <Link to="/login" className="btn btn-primary">Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar