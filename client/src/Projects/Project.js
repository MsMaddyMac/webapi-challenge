import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';

const Project = (props) => {
  const [project, setProject] = useState(null);
 
  useEffect(() => {
    const id = props.match.params.id;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`https://mmapisprint.herokuapp.com/api/projects/${id}`)
        .then(response => {
          setProject(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[props.match.params.id]);
  
  const saveProject = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(project)
  }

  if (!project) {
    return <div>Loading project information...</div>;
  }

  return (
    <div className="save-wrapper">
      <ProjectCard project={project}/>
      <div onClick={saveProject} className="save-button">Save</div>
    </div>
  );
}

export default Project;
