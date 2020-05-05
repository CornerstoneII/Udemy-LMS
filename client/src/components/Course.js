import React from "react";

function Course({ title, img, price, offer }) {
  return (
    <div class="course">
      <img class="course-image" src={img} alt={title} />
      <div class="course-info">
        <h4>{title}</h4>
        <p>Instructor Name</p>
        <img src="img/stars.png" alt="stars" />
        <div class="price">
          <p class="regular">{price}</p>
          <p class="offer">{offer}</p>
        </div>
        <a href="#" class="button">
          Add to Cart
        </a>
      </div>
    </div>
  );
}

export default Course;
