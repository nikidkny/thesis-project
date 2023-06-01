import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { supabase, fetchLessonsByCourseId } from "../../../../supabase";
import { AuthContext } from ".././../../../AuthProvider";

export default function Course({ courseId, title, progress, metadata, duration, description }) {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const fetchedLessons = await fetchLessonsByCourseId(courseId);

      if (fetchedLessons) {
        setLessons(fetchedLessons);
      }
    }

    fetchData();
  }, [courseId]);

  const handleButtonClick = async () => {
    if (lessons.length > 0) {
      const firstLesson = lessons[0];
      console.log(firstLesson.id);
      const lessonId = parseInt(firstLesson.id, 10);

      try {
        const { data: lessonData, error: lessonError } = await supabase
          .from("lessons")
          .select("title")
          .eq("id", lessonId)
          .limit(1);

        if (lessonError) {
          throw new Error(lessonError.message);
        }

        if (lessonData && lessonData.length > 0) {
          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from("enrollments")
            .insert([
              {
                user_id: parseInt(user.id, 10),
                course_id: courseId,
                lesson_id: lessonId,
                completion_status: false,
              },
            ]);
          console.log("enrollmentData:", enrollmentData);
          console.log("enrollmentError:", enrollmentError);
          if (enrollmentError) {
            throw new Error(enrollmentError.message);
          }

          navigate(`/lesson/${courseId}/${lessonId}`);
        } else {
          console.error("Lesson data not found or empty.");
        }
      } catch (error) {
        console.error("Error fetching lesson title:", error);
      }
    } else {
      console.error("No lessons available for this course.");
    }
  };

  return (
    <div className="course">
      <h5>{title}</h5>
      {progress && <p>Progress: {progress} %</p>}
      {duration && <p>Last Lesson: {duration}</p>}
      {description && <p>{description}</p>}
      {metadata && metadata.tag && <p>{metadata.tag}</p>}
      <button onClick={handleButtonClick}>Start lesson</button>
    </div>
  );
}
