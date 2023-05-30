import classNames from "classnames";
import Header from "../components/globals/Header/Header";
import SearchBar from "../components/items/SearchBar/SearchBar";
import Line from "../components/globals/Line/Line";
import Course from "../components/items/Course/Course";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import InputCheckbox from "../components/items/InputCheckbox/InputCheckbox";

const CoursesPage = ({ className }) => {
  const [courses, setCourses] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const classes = classNames([className, "courses"]);

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

  const handleTagChange = (tag, checked) => {
    setSelectedTags((prevTags) => {
      if (checked) {
        return [...prevTags, tag];
      } else {
        return prevTags.filter((t) => t !== tag);
      }
    });
  };

  const renderInputCheckBoxes = (courses) => {
    const allTagsSet = new Set();
    courses.forEach((course) => {
      if (course.metadata && course.metadata.tag) {
        course.metadata.tag.forEach((tag) => {
          allTagsSet.add(tag);
        });
      }
    });

    const allTags = Array.from(allTagsSet);

    const tagCounts = {};

    courses.forEach((course) => {
      if (course.metadata && course.metadata.tag) {
        course.metadata.tag.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    return allTags.map((tag, index) => (
      <InputCheckbox
        key={index}
        id={`checkbox-${index}`}
        name={tag}
        label={`${tag} (${tagCounts[tag]})`}
        checked={selectedTags.includes(tag)}
        onChange={(e) => handleTagChange(tag, e.target.checked)}
      />
    ));
  };

  const filteredCourses = courses.filter((course) => {
    if (selectedTags.length === 0) {
      return true; // Show all courses if no tags are selected
    }
    if (course.metadata && course.metadata.tag) {
      return course.metadata.tag.some((tag) => selectedTags.includes(tag));
    }
    return false;
  });

  return (
    <div className={classes}>
      <Header theme="dark" />
      <section className="hero">
        <h1>Courses</h1>
        <SearchBar icon="icon-search" />
      </section>
      <Line className="decoration" />
      <section className="courses_content">
        <aside>
          <h5>Filters</h5>
          <h5>Topic</h5>
          {renderInputCheckBoxes(courses)}
        </aside>
        <div className="courses_content_course">
          {filteredCourses.map((course) => (
            <Course
              key={course.id}
              courseId={course.id}
              title={course.title}
              description={course.description}
              metadata={course.metadata}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
