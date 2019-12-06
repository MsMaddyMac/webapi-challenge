import React from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
    this.fetchProject(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchProject(newProps.match.params.id);
    }
  }

  fetchProject = id => {
    axios
      .get(`https://mmapisprint.herokuapp.com/api/projects/${id}`)
      .then(res => this.setState({ project: res.data }))
      .catch(err => console.log(err.response));
  };

  saveProject = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.project);
  };

  render() {
    if (!this.state.project) {
      return <div>Loading project information...</div>;
    }

    return (
      <div className="save-wrapper">
        <ProjectCard movie={this.state.project} />
        <div className="save-button" onClick={this.saveProject}>
          Save
        </div>
        <button>Update</button>
        {/* <button onClick={() => this.props.history.push(`/update-item/${this.state.movie.id}`)}>Edit</button> */}
      </div>
    );
  }
}
