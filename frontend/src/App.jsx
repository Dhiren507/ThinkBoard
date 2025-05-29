import { Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import OfflineNotice from "./components/OfflineNotice";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ThinkMateChat from "./pages/ThinkMateChat";

const App = () => {
  return (
    <AuthProvider>
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreatePage /></PrivateRoute>} />
          <Route path="/note/:id" element={<PrivateRoute><NoteDetailPage /></PrivateRoute>} />
          <Route path="/thinkmate" element={<PrivateRoute><ThinkMateChat /></PrivateRoute>} />
          <Route path="*" element={<div className="flex min-h-screen items-center justify-center">
            <div className="card bg-base-100 p-8 shadow-xl">
              <h2 className="text-2xl font-bold">Page Not Found</h2>
              <p className="mt-2">The page you are looking for doesn't exist.</p>
              <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
            </div>
          </div>} />
        </Routes>
        <OfflineNotice />
      </div>
    </AuthProvider>
  );
};
export default App;