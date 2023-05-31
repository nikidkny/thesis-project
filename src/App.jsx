import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/assets/scss/main.scss";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";

import CommunityPage from "./pages/CommunityPage";
import CoursesPage from "./pages/CoursesPage";

import LessonPage from "./pages/LessonPage";
import FinishedPage from "./pages/FinishedPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/lesson/:courseId/:lessonId" element={<LessonPage />} />
        <Route path="/finished/:courseId" element={<FinishedPage />} />
      </Routes>
    </Router>
  );
}

//export default function App() {
//const [isAuthenticated, setIsAuthenticated] = useState(false);

// useEffect(() => {
//   const checkAuthentication = async () => {
//     const user = supabase.auth.user();
//     setIsAuthenticated(user !== null);
//   };

//   checkAuthentication();
// }, []);
//return (
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
//  );
//}
