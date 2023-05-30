import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "../src/assets/scss/main.scss";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
// import MainContent from "./components/globals/MainContent";
import CommunityPage from "./pages/CommunityPage";
import CoursesPage from "./pages/CoursesPage";
// import { supabase } from "../supabase";
// import { useState, useEffect } from "react";
import LessonPage from "./pages/LessonPage";
import FinishedPage from "./pages/FinishedPage";

// const [isAuthenticated, setIsAuthenticated] = useState(false);

// useEffect(() => {
//   const checkAuthentication = async () => {
//     const user = supabase.auth.user();
//     setIsAuthenticated(user !== null);
//   };

//   checkAuthentication();
// }, []);
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/lesson/:courseId/:lessonTitle" element={<LessonPage />} />{" "}
      </Routes>
    </Router>
  );
}

{
  /* <Router>
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/profile" element={<UserProfilePage />} />
  <Route path="/courses" element={<CoursesPage />} />
  <Route path="/community" element={<CommunityPage />} />
  <Route path="/course/:courseId/lesson/:lessonId" element={<LessonPage />} />
  <Route path="/course/:courseId/finished" element={<FinishedPage />} />
</Routes>
</Router> */
}
// <Router>
//   <div>
//     <Routes>
//       <Route exact path="/login" component={Loginpage} />
//       {isAuthenticated ? (
//         <Route path="/">
//           <MainContent>
//             <Routes>
//               <Route path="/profile" component={Profilepage} />
//               <Navigate to="/profile" /> {/* Default redirect */}
//             </Routes>
//           </MainContent>
//         </Route>
//       ) : (
//         <Navigate to="/login" />
//       )}
//     </Routes>
//   </div>
// </Router>
