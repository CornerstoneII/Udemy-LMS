import React from "react";
import "./Hero.scss";

function Hero() {
  return (
    <div class="hero">
      <div class="hero-content container">
        <h2>Aspire. Accomplish.</h2>
        <p>
          Upgrade your skills, level up in life. Courses from $9.99 ends May 14.
        </p>
        <form action="#" method="post">
          <input type="text" placeholder="What do you want to learn?" />
          <input type="submit" class="submit" />
        </form>
      </div>
    </div>
  );
}

export default Hero;
