import React, { useState, useEffect } from "react";
import "./App.css";

function ResponsiveComponent() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const student = {
    name: "Hema",
    id: "12345",
    course: "B.Tech - CSE",
    email: "hema@example.com",
  };

  return (
    <div className="container">
      <h2>Student Information</h2>
      <div className={isMobile ? "vertical" : "horizontal"}>
        <div className="info-box">
          <strong>Name:</strong> {student.name}
        </div>
        <div className="info-box">
          <strong>ID:</strong> {student.id}
        </div>
        <div className="info-box">
          <strong>Course:</strong> {student.course}
        </div>
        <div className="info-box">
          <strong>Email:</strong> {student.email}
        </div>
      </div>
    </div>
  );
}

export default ResponsiveComponent;
