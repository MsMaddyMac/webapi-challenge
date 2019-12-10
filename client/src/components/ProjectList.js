import React, { useState, useEffect } from 'react';
import ActionCard from "./ActionCard";

// import axios from 'axios';

const ProjectList = ({ title }) => {
  // const [projects, setProjects] = useState([])

  // useEffect(() => {
  //   const getProjects = () => {
  //     axios
  //       .get('https://mmapisprint.herokuapp.com/api/projects')
  //       .then(response => {
  //         console.log(response);
  //         setProjects(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Server Error', error);
  //       });
  //   }
    
  //   getProjects();
  // }, []);
  

  return (
    <div style={styles.container}>
      <h4>{title}</h4>
      <ActionCard />
      {/* {projects.map(project => (
        <div key={project.id}>
          <h1>{project.name}</h1>
        </div>
        <Link to={`/projects/${project.id}`}>
          <ProjectCard key={project.id} project={project}/>
       </Link>
        <ProjectDetails key={project.id} project={project} />
      ))} */}
    </div> 
  );
}

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    padding: 8
  }
};

export default ProjectList;
