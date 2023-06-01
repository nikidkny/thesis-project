import { useEffect, useContext } from "react";
import { AuthContext, AuthProvider } from "../AuthProvider";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import CommunityPage from "./pages/CommunityPage";
import CoursesPage from "./pages/CoursesPage";
import LessonPage from "./pages/LessonPage";
import FinishedPage from "./pages/FinishedPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = ({ handleLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile");
  }, []); // Empty dependency array to run the effect only once

  const PrivateRoute = ({ element: Element, path }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Element /> : <Navigate to="/login" replace={true} />;
  };
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/profile" element={<PrivateRoute element={<UserProfilePage />} />} />
          <Route path="/courses" element={<PrivateRoute element={<CoursesPage />} />} />
          <Route path="/community" element={<PrivateRoute element={<CommunityPage />} />} />
          <Route
            path="/lesson/:courseId/:lessonId"
            element={<PrivateRoute element={<LessonPage />} />}
          />
          <Route path="/finished/:courseId" element={<PrivateRoute element={<FinishedPage />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
