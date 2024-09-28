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

  // Handle scroll for the "scroll to top" button 
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
  
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("scroll-lock"); // Add scroll-lock class when loading
    } else {
      document.body.classList.remove("scroll-lock"); // Remove scroll-lock class when not loading
    }
  }, [isLoading]);


  // Save the page scroll position on page unload
  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem("pageScrollPosition", window.scrollY);
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  // Restore the page scroll position after page reload
  useEffect(() => {
    const pageScrollPosition = localStorage.getItem("pageScrollPosition");
    if (pageScrollPosition) {
      window.scrollTo(0, parseInt(pageScrollPosition, 10)); 
    }
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let imagesLoaded = 0;

    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkImagesLoaded();
      } else {
        img.addEventListener("load", checkImagesLoaded);
        img.addEventListener("error", checkImagesLoaded); 
      }
    });

    if (images.length === 0 || imagesLoaded === images.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div id="up" className="container">
        <Header />
        <div>
          <Hero />
          <div className="divider" />
          <Main />
          <div className="divider" />
          <Contact id="contact" />
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