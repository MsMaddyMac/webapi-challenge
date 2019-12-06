import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("https://mmapisprint.herokuapp.com/api/projects")
      .then(res => this.setState({ projects: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="project-list">
        {this.state.projects.map(project => (
          <ProjectDetails key={project.id} movie={project} />
        ))}
      </div>
    );
  }
}

function ProjectDetails({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <ProjectCard movie={project} />
    </Link>
  );
}
