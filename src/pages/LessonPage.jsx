import React, { useEffect, useState } from "react";
import LessonTemplate from "../components/items/Lesson/LessonTemplate";
import { supabase } from "../../supabase";
import { useParams } from "react-router-dom";

export default function LessonPage() {
  const { courseId, lessonTitle } = useParams();
  const [lessonContent, setLessonContent] = useState(null);

  useEffect(() => {
    async function fetchLessonContent() {
      try {
        const decodedLessonTitle = decodeURIComponent(lessonTitle);
        const { data: lessonData, error: lessonError } = await supabase
          .from("lessons")
          .select("*") // Fetch all columns from the 'lessons' table
          .eq("course_id", courseId)
          .eq("title", decodedLessonTitle)
          .limit(1);

        if (lessonError) {
          throw new Error(lessonError.message);
        }

        if (lessonData && lessonData.length > 0) {
          const lesson = lessonData[0];
          setLessonContent(lesson);
        }
      } catch (error) {
        console.error("Error fetching lesson content:", error);
      }
    }

    fetchLessonContent();
  }, [courseId, lessonTitle]);

  return (
    <div>
      {lessonContent ? (
        <LessonTemplate content={lessonContent} />
      ) : (
        <p>Loading lesson content...</p>
      )}
    </div>
  );
}
