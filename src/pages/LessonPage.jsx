import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase, fetchLessonContent, fetchPreviousLesson, fetchNextLesson } from "../../supabase";
import Header from "../components/globals/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faLongArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [previousLesson, setPreviousLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const lessonContent = await fetchLessonContent(courseId, lessonId);
      if (lessonContent) {
        setCurrentLesson(lessonContent);
      }
    }

    fetchData();
  }, [courseId, lessonId]);

  useEffect(() => {
    async function fetchPreviousLessonData() {
      const previousLessonData = await fetchPreviousLesson(courseId, lessonId);
      if (previousLessonData) {
        setPreviousLesson(previousLessonData);
      }
    }

    fetchPreviousLessonData();
  }, [courseId, lessonId]);

  useEffect(() => {
    async function fetchNextLessonData() {
      const nextLessonData = await fetchNextLesson(courseId, lessonId);
      if (nextLessonData) {
        setNextLesson(nextLessonData);
      }
    }

    fetchNextLessonData();
  }, [courseId, lessonId]);

  const handlePreviousLessonClick = () => {
    if (previousLesson && previousLesson.id) {
      navigate(`/lesson/${courseId}/${previousLesson.id}`);
    }
  };

  const handleNextLessonClick = () => {
    if (nextLesson && nextLesson.id) {
      navigate(`/lesson/${courseId}/${nextLesson.id}`);
    }
  };

  return (
    <div className="lesson-page">
      {currentLesson ? (
        <div className="lesson">
          <Header theme="dark" />
          <section className="lesson--content">
            <h3>{currentLesson.title}</h3>
            <div className="paragraphs">
              {currentLesson.description.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section className="lesson--media">
            <div className="lesson--media-sticky">
              {/* {currentLesson.image_url && <img src={currentLesson.image_url} alt="Lesson Image" />}
              {currentLesson.video_url && <video src={currentLesson.video_url} controls />} */}
              {/* Add more elements for other columns */}
              <div className="page-actions">
                {previousLesson && previousLesson.id && (
                  <div className="button-container lesson-buttons">
                    <svg
                      className="arrow-icon left-arrow"
                      id="Layer_2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="6"
                      viewBox="0 0 37 6"
                    >
                      <g id="Layer_2-2">
                        <polygon points="37 2 3 2 4 0 0 3 4 6 3 4 37 4 37 2" fill="#200bd1" />
                      </g>
                    </svg>
                    <button className="previous-lesson-button" onClick={handlePreviousLessonClick}>
                      Previous Lesson
                    </button>
                  </div>
                )}
                {nextLesson && nextLesson.id ? (
                  <div className="button-container lesson-buttons">
                    <button className="next-lesson-button" onClick={handleNextLessonClick}>
                      Next Lesson
                    </button>
                    <svg
                      className="arrow-icon right-arrow"
                      id="Layer_2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="6"
                      viewBox="0 0 37 6"
                    >
                      <g id="Layer_2-2">
                        <polygon points="0 4 34 4 33 6 37 3 33 0 34 2 0 2 0 4" fill="#200bd1" />
                      </g>
                    </svg>
                  </div>
                ) : (
                  <div className="button-container lesson-buttons">
                    <Link to={`/finished/${courseId}`}>Finish Lesson</Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Loading lesson content...</p>
      )}
    </div>
  );
}
