import classNames from "classnames";
import Header from "../components/globals/Header/Header";
import Line from "../components/globals/Line/Line";
import Course from "../components/items/Course/Course";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { AuthContext } from "../../AuthProvider";

const UserProfilePage = ({ className, days, goal }) => {
  var classes = classNames([className, "profile"]);
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    }

    if (user) {
      fetchEnrollments();
    }
  }, [user]);

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
        <img src="src/assets/media/clippy.gif" alt="an animation of a clipper" />
      </div>
      <Line />
      <div>
        <h4>My courses</h4>
        {enrollments.map((enrollment) => {
          const course = enrollment.course;
          return (
            <Course
              key={course.id}
              courseId={course.id}
              title={course.title}
              description={course.description}
              metadata={course.metadata}
              enrolled
            />
          );
        })}
      </div>
      <Line />
    </div>
  );
};

export default UserProfilePage;
