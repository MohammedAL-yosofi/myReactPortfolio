import Loader from "./components/loader/loader";
import Hero from "./components/2-hero/Hero";
import Header from "./components/1-header/Header";
import Main from "./components/3-main/Main";
import Contact from "./components/4-contact/Contact";
import Footer from "./components/5-footer/Footer";
import { useEffect, useState } from "react";

function App() {
  const [showScrollBTN, setShowScrollBTN] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  // Handle scroll for the "scroll to top" button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBTN(true);
      } else {
        setShowScrollBTN(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("scroll-lock"); // Add scroll-lock class when loading
    } else {
      document.body.classList.remove("scroll-lock"); // Remove scroll-lock class when not loading
    }
  }, [isLoading]);

  // Ensure loader stays for at least 0.5 seconds and waits for images to load
  useEffect(() => {
    const images = document.querySelectorAll("img");
    let imagesLoaded = 0;

    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        setTimeout(() => {
          setIsLoading(false); // Finish loading
        }, 500); // Ensure loader is visible for 0.5 seconds
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkImagesLoaded();
      } else {
        img.addEventListener("load", checkImagesLoaded);
        img.addEventListener("error", checkImagesLoaded); // Handle errors
      }
    });

    // If there are no images or all load instantly
    if (images.length === 0 || imagesLoaded === images.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // 0.5s delay
    }
  }, []);

  // Timeout for showing "Network Timeout" message if loading takes more than 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setShowTimeoutMessage(true); // Show timeout message
        setIsLoading(false); // Stop loading
        setTimeout(() => {
          setShowTimeoutMessage(false); // Hide timeout message after 2 seconds
        }, 2000);
      }
    }, 5000); // 5 seconds timeout

    return () => {
      clearTimeout(timeoutId); // Clear timeout on unmount
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when loading */}

      {/* Network Timeout Message */}
      {showTimeoutMessage && (
        <div className={`timeout-message ${showTimeoutMessage ? 'show-message' : ''}`}>
          Network Timeout
        </div>
      )}

      <div id="up" className="container" >
        <Header />
        <div>
          <Hero />
          <div className="divider" id="project" />
          <Main />
          <div className="divider" />
          <Contact />
          <div className="divider" />
          <Footer />

          {/* Scroll to Top Button */}
          <a
            style={{ opacity: showScrollBTN ? 1 : 0, transition: "opacity 0.5s ease" }}
            href="#up"
            className="scroll-to-top"
          >
            <button className="icon-keyboard_arrow_up scroll2Top"></button>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;