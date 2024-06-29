import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="card">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
