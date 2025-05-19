import { useEffect, useState } from "react";

// Assets
import "./App.css";
import chaiLogo from "./assets/chai.svg";

// Components
import CourseCard from "./components/CourseCard";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [dataSource, setDataSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState("v1");
  const [host, setHost] = useState("unknown");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/courses`
      );
      const data = await response.json();
      setCourses(data.data);
      setDataSource(data.source);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const seedCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/seed`
      );
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/version`
      );
      const data = await response.json();

      setVersion(data.version);
      setHost(data.host);
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://chaicode.com" target="_blank">
          <img src={chaiLogo} className="logo chai code" alt="Chai Code logo" />
        </a>
      </div>
      <h1>
        ChaiCode DevOps {version} ({host})
      </h1>
      <div className="card">
        <button onClick={fetchCourses} disabled={loading}>
          {loading ? "Loading..." : "View courses"}
        </button>
      </div>
      <div className="card">
        <button onClick={seedCourse} disabled={loading}>
          {loading ? "Loading..." : "Seed course"}
        </button>
      </div>
      {dataSource && (
        <p className="data-source">Data loaded from: {dataSource}</p>
      )}
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </div>
      <p className="read-the-docs">Home for Programmers</p>
    </>
  );
};

export default App;
