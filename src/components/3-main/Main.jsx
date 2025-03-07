import {
  useState
} from "react";
import "./main.css";
import {
  myProjects
} from "./myProjects";
import {
  AnimatePresence,
  motion
} from "framer-motion";

const Main = () => {
  const [currentActive,
    setCurrentActive] = useState("all");
  const [arr,
    setArr] = useState(myProjects);

  const handleClick = (buttonCategory) => {
    setCurrentActive(buttonCategory);

    const finalFilter = myProjects.filter((item) => {
      const filterCategoryArr = item.category.find((myItem) => {
        return (myItem === buttonCategory);
      });

      return filterCategoryArr === buttonCategory;
    });
    setArr(finalFilter);
  };

  return (
    <main id="projects" className="flex py-2">
      <section className="flex  left-section">
        <button
          onClick={() => {
            setCurrentActive("all");
            setArr(myProjects);
          }}
          className={currentActive === "all" ? "active": null}
          >
          all projects
        </button>

        <button
          onClick={() => {
            handleClick("css");
          }}
          className={currentActive === "css" ? "active": null}
          >
          <a href="#project">

            HTML & CSS
          </a>
        </button>

        <button
          onClick={() => {
            handleClick("tailwind");
          }}
          className={currentActive === "tailwind" ? "active": null}
          >
          <a href="#project">

            tailwind & alpin
          </a>
        </button>
        <button
          onClick={() => {
            handleClick("react");
          }}
          className={currentActive === "react" ? "active": null}
          >
          <a href="#project">

            React
          </a>
        </button>
        <button
          onClick={() => {
            handleClick("php");
          }}
          className={currentActive === "php" ? "active": null}
          >
          <a href="#project">

            php
          </a>
        </button>

        <button
          onClick={() => {
            handleClick("laravel");
          }}
          className={currentActive === "laravel" ? "active": null}
          >
          <a href="#project">

            laravel
          </a>
        </button>
      </section>

      <section className=" flex right-section">
        <AnimatePresence>
          {arr.map((item) => {
            return (
              <motion.article
                layout
                initial={ { transform: "scale(0.4)" }}
                animate={ { transform: "scale(1)" }}
                transition={ { type: "spring", damping: 8, stiffness: 50 }}
                key={item.imgPath}
                className="  card"
                >
                <img width={266} src={item.imgPath} alt="" />

              <div style={ { width: "266px" }} className="box">
                <h1 className="title">{item.projectTitle}</h1>
                <p className="sub-title">
                  {item.description === "" ? 'no ': 'yes'}
                  Lorem ipsum dolor sit amet consectetur elit adipisicing . Ex
                  tempore dolor in, accusantium laudantium accusamus.
                </p>

                <div className="flex icons">
                  <div style={ { gap: "11px" }} className="flex">
                    <div className="icon-link"></div>
                    <div className="icon-github"></div>
                  </div>

                  <a className="link flex" href="">
                    more
                    <span
                      style={ { alignSelf: "end" }}
                      className="icon-arrow-right"
                      ></span>
                  </a>
                </div>
              </div>
            </motion.article>
          );
          })}
      </AnimatePresence>
    </section>
  </main>
);
};

export default Main;