import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

// Settings
import Profile from "./settings/Profile";
import Password from "./settings/Password";
import Notification from "./settings/Notification";

// Help
import Faqs from "./help/Faqs";
import Tickets from "./help/Tickets";
import Status from "./help/Status";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* NAVBAR */}
        <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-lg font-semibold">Challenge 15</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/settings/profile" className="hover:underline">Settings</Link>
            <Link to="/help/faqs" className="hover:underline">Help</Link>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="p-6">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Settings */}
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/settings/password" element={<Password />} />
            <Route path="/settings/notification" element={<Notification />} />

            {/* Help */}
            <Route path="/help/faqs" element={<Faqs />} />
            <Route path="/help/tickets" element={<Tickets />} />
            <Route path="/help/status" element={<Status />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
