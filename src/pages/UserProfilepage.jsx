import classNames from "classnames";
import Header from "../components/globals/Header/Header";
import Line from "../components/globals/Line/Line";
import Course from "../components/items/Course/Course";
import AssignedCourse from "../components/items/AssignedCourse/AssignedCourse";
import Footer from "../components/globals/Footer/Footer";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const UserProfilePage = ({ className, days, goal }) => {
  var classes = classNames([className, "profile"]);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase.from("courses").select("*");
        console.log(data);

        if (error) {
          throw new Error(error.message);
        }
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);
  useEffect(() => {
    async function fetchProgress() {
      try {
        const { data, error } = await supabase.from("progress").select("*");
        console.log(data);
        if (error) {
          throw new Error(error.message);
        }
        setProgress(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchProgress();
  }, []);
  return (
    <div className={classes}>
      <Header theme="dark" />
      <h2>My profile</h2>
      <h4>My goals</h4>
      <div className="goal">
        <p>this month</p>
        <h5>
          {days} Days/ {goal} Days
        </h5>
        <img src="src/assets/clippy.gif" alt="an animation of a clipper" />
      </div>
      <Line />
      <div>
        <h4>My courses</h4>
        {courses.map((course) => {
          const courseProgress = progress.find((item) => item.course_id === course.id);
          const progressPercentage = courseProgress ? courseProgress.progress_percentage : 0;

          return (
            <Course
              key={course.id}
              title={course.title}
              description={course.description}
              duration={course.duration}
              metadata={course.metadata}
              progress={progressPercentage}
            />
          );
        })}
      </div>
      <Line />
      {/* <div>
        <h4>Assigned courses</h4>
        <AssignedCourse />
      </div> */}
      <Footer />
    </div>
  );
};

export default UserProfilePage;
