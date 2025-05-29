import { ArrowLeftIcon, Sparkles, EyeIcon, EditIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../lib/axios";
import { formatTextContent } from "../lib/utils";
import LoadingSpinner from "../components/LoadingSpinner";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAIAssist = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt for the AI");
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await api.post("/api/ai/generate", { prompt });
      
      setContent(prev => prev ? `${prev}\n\n${response.data.generatedText}` : response.data.generatedText);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
      setPrompt("");
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
                </div>                <div className="form-control mb-4">
                  <div className="flex justify-between items-center">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <div className="btn-group">
                      <button 
                        type="button"
                        className={`btn btn-xs ${!isPreviewMode ? 'btn-active' : ''}`}
                        onClick={() => setIsPreviewMode(false)}
                      >
                        <EditIcon size={16} />
                        <span className="ml-1">Edit</span>
                      </button>
                      <button 
                        type="button"
                        className={`btn btn-xs ${isPreviewMode ? 'btn-active' : ''}`}
                        onClick={() => setIsPreviewMode(true)}
                      >
                        <EyeIcon size={16} />
                        <span className="ml-1">Preview</span>
                      </button>
                    </div>                  </div>
                  
                  {isPreviewMode ? (
                    <div className="bg-base-200 p-4 rounded-lg min-h-[8rem] prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: formatTextContent(content) }}></div>
                    </div>
                  ) : (
                    <textarea
                      placeholder="Write your note here... Use ***text*** for bold formatting"
                      className="textarea textarea-bordered h-32"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />                  )}
                  
                  <div className="mt-2 text-xs text-base-content/60">
                    <span>Tip: Use ***text*** to make text <strong>bold</strong></span>
                  </div>
                </div>

                {/* AI Assistant Section with Gemini branding */}
                <div className="bg-base-200 p-4 rounded-lg mb-4 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-primary" size={20} />
                    <h2 className="text-lg font-semibold">Gemini AI Writing Assistant</h2>
                  </div>
                  <div className="form-control mb-2">
                    <input 
                      type="text" 
                      className="input input-bordered w-full" 
                      placeholder="Describe what you want to write about..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAIAssist}
                    disabled={isGenerating || !prompt}
                  >
                    {isGenerating ? <span className="loading loading-spinner"></span> : "Help Me Write"}
                  </button>
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