import React from 'react';
import { Link } from 'react-router-dom';

const SavedList = props => (
  <div className="saved-list">
    <h3>Saved Projects:</h3>
    {props.list.map(project => (
      <span className="saved-project">{project.name}</span>
    ))}
    <Link className="home-button" to="/">Home</Link>
  </div>
);

export default SavedList;