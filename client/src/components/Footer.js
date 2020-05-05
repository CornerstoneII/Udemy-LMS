import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer id="footer" class="footer">
      <div class="container">
        <div class="container-footer">
          <nav class="menu">
            <a class="link" href="#">
              Udemy for Business
            </a>
            <a class="link" href="#">
              Become an Instructor
            </a>
            <a class="link" href="#">
              Udemy App
            </a>
          </nav>
          <nav class="menu">
            <a class="link" href="#">
              About Us
            </a>
            <a class="link" href="#">
              Careers
            </a>
            <a class="link" href="#">
              Blog
            </a>
          </nav>
          <nav class="menu">
            <a class="link" href="#">
              Topics
            </a>
            <a class="link" href="#">
              Support
            </a>
            <a class="link" href="#">
              Afilliate
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
