import React, { useState, useEffect } from 'react';
import ActionCard from "./ActionCard";
import SampleImage from '../img/sample.jpg';

// material-ui imports
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  listSubheader: {
    backgroundColor: 'teal'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const ProjectList = ({ title }) => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader className={classes.listSubheader} component="div">{title}</ListSubheader>
        </GridListTile>
        {projects.map(project => (
          <GridListTile key={project.id}>
            <img src={SampleImage} alt={project.title} />
            <GridListTileBar
              title={project.title}
              subtitle={<span>description: {project.description}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${project.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
  //   <div style={styles.container}>
  //     <h4>{title}</h4>
  //     <ActionCard />
  //     {/* {projects.map(project => (
  //       <div key={project.id}>
  //         <h1>{project.name}</h1>
  //       </div>
  //       <Link to={`/projects/${project.id}`}>
  //         <ProjectCard key={project.id} project={project}/>
  //      </Link>
  //       <ProjectDetails key={project.id} project={project} />
  //     ))} */}
  //   </div> 
  // );
}

// const styles = {
//   container: {
//     backgroundColor: "#ccc",
//     borderRadius: 3,
//     width: 300,
//     padding: 8
//   }
// };

export default ProjectList;
