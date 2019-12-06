import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Project:</h3>
        {this.props.list.map(project => {
          return (
            <NavLink
              to={`/projects/${project.id}`}
              key={project.id}
              activeClassName="saved-active"
            >
              <span className="saved-project">{project.name}</span>
            </NavLink>
          );
        })}
        <div className="home-button">
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}
