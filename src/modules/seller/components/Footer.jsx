import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      {/* Grid container */}
      <div className="container">
        {/* Section: Social media */}
        <section className="mb-4">
          <div className="flex justify-center space-x-4">
            {/* Facebook */}
            <a
              className="text-white hover:text-blue-500"
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f text-xl" />
            </a>
            {/* Twitter */}
            <a
              className="text-white hover:text-blue-400"
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter text-xl" />
            </a>
            {/* Google */}
            <a
              className="text-white hover:text-red-500"
              href="#!"
              role="button"
            >
              <i className="fab fa-google text-xl" />
            </a>
            {/* Instagram */}
            <a
              className="text-white hover:text-pink-500"
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram text-xl" />
            </a>
            {/* Linkedin */}
            <a
              className="text-white hover:text-blue-800"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in text-xl" />
            </a>
            {/* Github */}
            <a
              className="text-white hover:text-gray-400"
              href="#!"
              role="button"
            >
              <i className="fab fa-github text-xl" />
            </a>
          </div>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div className="text-center py-3 bg-gray-600">
        © 2023 Your Company. All Rights Reserved.
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
