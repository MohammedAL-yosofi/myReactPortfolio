import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/done.json";
import contactAnimation from "../../animation/contact.json";
import { useEffect, useState } from "react";

const Contact = () => {
  const [state, handleSubmit] = useForm("myzglwqe");
  const [visitorID, setVisitorID] = useState(null);

  // Function to generate a random ID
  const generateRandomID = () => {
    return `visitor-${Math.floor(Math.random() * 1000000)}`;
  };

  useEffect(() => {
    let id = localStorage.getItem("visitorID");

    if (!id) {
      // Generate a new ID if none exists
      id = generateRandomID();
      localStorage.setItem("visitorID", id);
      console.log("New visitor ID assigned:", id);

      // Automatically submit a form with the new visitor ID
      const formData = new FormData();
      formData.append("visitorID", id);
      formData.append("message", `You have a new visitor ID: ${id}`);
      formData.append("email", "no-reply@yourdomain.com"); // Dummy email for formspree
      
      // Automatically post to Formspree
      fetch("https://formspree.io/f/myzglwqe", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log("Visitor ID sent via email");
        } else {
          console.error("Failed to send visitor ID");
        }
      });
    } else {
      console.log("Returning visitor with ID:", id);
    }

    // Set the visitor ID to state
    setVisitorID(id);
  }, []);

  return (
    <section id="contact" className="contact-me">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact me
      </h1>
      <p className="sub-title">
        Contact me for more information and Get notified when I publish
        something new.
      </p>

      <div style={{ justifyContent: "space-between" }} className="flex">
        <form onSubmit={handleSubmit} className="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="message" id="message"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          {/* Hidden input to send visitor ID */}
          <input type="hidden" name="visitorID" value={visitorID || ""} />

          <button type="submit" disabled={state.submitting} className="submit">
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p
              className="flex sub-title"
              style={{ fontSize: "18px", marginTop: "1.7rem" }}
            >
              <Lottie
                loop={false}
                style={{ height: 37 }}
                animationData={doneAnimation}
              />
              Your message has been sent successfully 👌
            </p>
          )}
        </form>
        <div className="animation">
          <Lottie
            className="contact-animation"
            style={{ height: 355 }}
            animationData={contactAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;