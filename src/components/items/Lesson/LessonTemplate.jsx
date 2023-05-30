import React from "react";

export default function LessonTemplate({ content }) {
  return (
    <div>
      <h1>{content.title}</h1>
      <h2>{content.subtitle}</h2>
      <p>{content.description}</p>
      <img src={content.image_url} alt="Lesson Image" />
      <video src={content.video_url} controls />
      {/* Add more elements for other columns */}
    </div>
  );
}
