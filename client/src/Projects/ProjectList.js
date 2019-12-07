import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import ProjectCard from "./ProjectCard";

import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = () => {
      axios
        .get('https://mmapisprint.herokuapp.com/api/projects')
        .then(response => {
          console.log(response);
          setProjects(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getProjects();
  }, []);
  

  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id}>
          <h1>{project.name}</h1>
        </div>
      //   <Link to={`/projects/${project.id}`}>
      //     <ProjectCard key={project.id} project={project}/>
      //  </Link>
        // <ProjectDetails key={project.id} project={project} />
      ))}
    </div> 
  );
}

// function ProjectDetails({ project }) {
  
//   return (
//     <Link to={`/projects/${project.id}`}>
//       <ProjectCard project={project}/>
//     </Link>
//   );
// }

export default ProjectList;
