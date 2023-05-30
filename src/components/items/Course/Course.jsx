import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../../../supabase";

export default function Course({ courseId, title, progress, metadata, duration, description }) {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLessons() {
      try {
        const { data, error } = await supabase
          .from("lesson_groups")
          .select("lesson_id")
          .eq("course_id", courseId)
          .order("order_number", { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        const lessonIds = data.map((lesson) => lesson.lesson_id);

        const { data: lessonData, error: lessonError } = await supabase
          .from("lessons")
          .select("id, title")
          .in("id", lessonIds);

        if (lessonError) {
          throw new Error(lessonError.message);
        }

        setLessons(lessonData);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    }

    fetchLessons();
  }, [courseId]);

  const handleButtonClick = async () => {
    if (lessons.length > 0) {
      const firstLesson = lessons[0];
      const lessonId = firstLesson.id;

      console.log("Lesson ID:", lessonId);

      try {
        const { data: lessonData, error: lessonError } = await supabase
          .from("lessons")
          .select("title")
          .eq("id", lessonId)
          .limit(1);

        console.log("Lesson Data:", lessonData);

        if (lessonError) {
          throw new Error(lessonError.message);
        }

        if (lessonData && lessonData.length > 0) {
          const lessonTitle = encodeURIComponent(lessonData[0].title);
          const courseTitle = encodeURIComponent(title);
          navigate(`/lesson/${courseId}/${lessonTitle}`); // Update the URL
        }
      } catch (error) {
        console.error("Error fetching lesson title:", error);
      }
    }
  };

  return (
    <div className="course">
      <h5>{title}</h5>
      {progress && <p>Progress: {progress} %</p>}
      {duration && <p>Last Lesson: {duration}</p>}
      {description && <p>{description}</p>}
      {metadata && metadata.tag && <p>{metadata.tag}</p>}
      <button onClick={handleButtonClick}>Start Lesson</button>
      {lessons.length > 0 && (
        <div>
          <h6>Lessons:</h6>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id}>{lesson.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
