import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Header from "../components/globals/Header/Header";
import Line from "../components/globals/Line/Line";
import Course from "../components/items/Course/Course";
import { supabase, fetchEnrollmentsByUserId, fetchAllCourses } from "../../supabase";
import { AuthContext } from "../../AuthProvider";

const UserProfilePage = ({ className, days, goal }) => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const classes = classNames([className, "profile"]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const userEnrollments = await fetchEnrollmentsByUserId(user.id);
        const courses = await fetchAllCourses();

        if (userEnrollments && courses) {
          const courseMap = courses.reduce((map, course) => {
            map[course.id] = course;
            return map;
          }, {});

          const updatedEnrollments = userEnrollments.map((enrollment) => {
            const courseId = enrollment.course_id;
            const course = courseMap[courseId];
            return {
              ...enrollment,
              course: course || null,
            };
          });

          setEnrollments(updatedEnrollments);
        }
      }
    }

    fetchData();
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
