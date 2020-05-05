import React from "react";
import Course from "./Course";
import courses from "../data/courses.json";
import "./CourseList.scss";

function CourseList() {
  function renderCourses() {
    return courses.map((course) => {
      return (
        <Course
          key={course.id}
          title={course.title}
          img={course.img}
          price={course.price}
          offer={course.offer}
        />
      );
    });
  }
  return <div class="course-list container">{renderCourses()}</div>;
}

export default CourseList;
