import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";

export default function Course({ courseId, title, description, metadata, enrolled }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (enrolled) {
      navigate(`/courses/${courseId}/lessons`);
    } else {
      enrollInCourse();
    }
  };

  const enrollInCourse = async () => {
    try {
      const { error } = await supabase.from("enrollments").insert([
        {
          user_id: supabase.auth.user().id,
          course_id: courseId,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      navigate(`/courses/${courseId}/lessons`);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="course">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleButtonClick}>{enrolled ? "Start Course" : "Enroll"}</button>
      {metadata && (
        <div>
          <h5>Metadata:</h5>
          <p>{metadata}</p>
        </div>
      )}
      <Link to={`/courses/${courseId}/progress`}>View Progress</Link>
    </div>
  );
}
