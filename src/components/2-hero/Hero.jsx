import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/developer.json";
import {
  useRef
} from "react";
import {
  motion
} from "framer-motion";

const Hero = () => {
  const lottieRef = useRef();

  return (
    <section className="hero flex">
      <div className="left-section  ">
        <div className="parent-avatar flex">
          <motion.img
            initial={ { transform: "scale(0)" }}
            animate={ { transform: "scale(1.1)" }}
            transition={ { damping: 6, type: "spring", stiffness: 100 }}
            src="./images/my1.jpg"
            className="avatar"
            alt=""
            />
          <div className="icon-verified"></div>
        </div>

        <motion.h1
          initial={ { opacity: 0 }}
          animate={ { opacity: 1 }}
          transition={ { duration: 2 }}
          className="title"
          >
          Software Engineer, <br />
        just intrested in web devlopment (Full Stack Developer)  &#128074;
      </motion.h1>

      <p className="sub-title">
        I’m Mohammed Fuad Alyosofi ,
      </p>

      <div className="all-icons flex">
        <div className="fa-brands fa-whatsapp" style={ { color: '#63E6BE' }}
        onClick={() => window.open('https://api.whatsapp.com/send/?phone=967737867532&text&type=phone_number&app_absent=0&wame_ctl=1', '_blank')}
        ></div>
        <div
          style={ { color: '#f7461e' }}
          className="icon icon-instagram"
          onClick={() => window.open('https://www.instagram.com/mohammed.fuad.alyosofi?utm_source=qr&igsh=MXJtcHNlYmRhN2Ru', '_blank')}
          >
        </div>
        <div className="icon icon-github" style={{color : '#818182'}}></div>
        <div className="fa-brands fa-linkedin" style={{color: '#0092c7'}}></div>
      </div>
    </div>

    <div className="right-section animation ">
      <Lottie
        lottieRef={lottieRef}
        className=""
        onLoadedImages={() => {
          // @ts-ignore
          // https://lottiereact.com/
          lottieRef.current.setSpeed(0.5);
        }}
        animationData={devAnimation}
        />
    </div>
  </section>
);
};

export default Hero;