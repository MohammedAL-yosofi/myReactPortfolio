import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/done.json";
import contactAnimation from "../../animation/contact.json";
import { useEffect, useState } from "react";

const Contact = () => {
  const [state, handleSubmit] = useForm("myzglwqe");
  const [visitorID, setVisitorID] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to generate a random ID
  const generateRandomID = () => {
    return `visitor-${Math.floor(Math.random() * 1000000)}`;
  };

  useEffect(() => {
    let id = localStorage.getItem("visitorID");
    let submitted = localStorage.getItem("formSubmitted");

    if (submitted === "true") {
      setIsSubmitted(true);
    }

    if (!id) {
      id = generateRandomID();
      localStorage.setItem("visitorID", id);
      console.log("New visitor ID assigned:", id);

      const userLocalTime = new Date().toLocaleString();

      const formData = new FormData();
      formData.append("visitorID", id);
      formData.append("message", `New visitor ID: ${id}`);
      formData.append("email", "no-reply@yourdomain.com");
      formData.append("localTime", userLocalTime);

      fetch("https://formspree.io/f/myzglwqe", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          console.log("Visitor ID and local time sent via email");
        } else {
          console.error("Failed to send visitor ID");
        }
      });
    } else {
      console.log("Returning visitor with ID:", id);
    }

    setVisitorID(id);
  }, []);

  // Capture current local time before submission
  const handleCustomSubmit = (event) => {
    event.preventDefault();
    const userLocalTime = new Date().toLocaleString();

    const formData = new FormData(event.target);
    formData.append("localTime", userLocalTime);

    handleSubmit(formData);

    // Mark form as submitted in localStorage
    setIsSubmitted(true);
    localStorage.setItem("formSubmitted", "true");
  };

  return (
    <section id="contact" className="contact-me">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact me
      </h1>
      <p className="sub-title">
        Contact me for more information and get notified when I publish
        something new.
      </p>

      <div style={{ justifyContent: "space-between" }} className="flex">
        <form onSubmit={handleCustomSubmit} className="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
              disabled={isSubmitted} // Disable input after submission
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="message" id="message" disabled={isSubmitted} />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          {/* Hidden inputs for visitor ID and local time */}
          <input type="hidden" name="visitorID" value={visitorID || ""} />
          <input type="hidden" name="localTime" value={localTime} />

          {!isSubmitted && (
            <button type="submit" disabled={state.submitting} className="submit">
              {state.submitting ? "Submitting ..." : "Submit"}
            </button>
          )}

          {state.succeeded || isSubmitted ? (
            <p className="flex sub-title" style={{ fontSize: "18px", marginTop: "1.7rem" }}>
              <Lottie loop={false} style={{ height: 37 }} animationData={doneAnimation} />
              Your message has been sent successfully ✔️
            </p>
          ) : null}
        </form>
        <div className="animation">
          <Lottie className="contact-animation" style={{ height: 355 }} animationData={contactAnimation} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
