import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");

  // Handle theme changes
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  // Disable or enable body scroll when modal is shown or hidden
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <header className="flex">
      <button
        onClick={() => setShowModal(true)}
        className="menu icon-menu flex"
      >
        {" "}
      </button>

      <nav>
        <ul className="flex">
          <li><a href="#footer">About</a></li>
          <li><a href="">Articles</a></li>
          <li><a href="$projects">Projects</a></li>
          <li><a href="#contact">Contact me</a></li>
        </ul>
      </nav>

      <button
        onClick={() => {
          // Toggle theme and store in local storage
          const newTheme = theme === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newTheme);
          setTheme(newTheme);
        }}
        className="mode flex"
      >
        {theme === "dark" ? (
          <span className="icon-moon-o"></span>
        ) : (
          <span className="icon-sun"></span>
        )}
      </button>

      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li>
              <button
                className="icon-close"
                onClick={() => setShowModal(false)}
              />
            </li>
          <li><a 
          onClick={()=> {
            setShowModal(false)
          }}
          href="#about">About</a></li>
          <li><a 
          onClick={()=> {
            setShowModal(false)
          }}
          href="">Articles</a></li>
          <li><a 
          onClick={()=> {
            setShowModal(false)
          }}
          href="#projects">Projects</a></li>
          <li><a onClick={()=> {
            setShowModal(false)
          }}
          href="#contact">Contact me</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;