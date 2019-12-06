import React from 'react';

const ProjectCard = props => {
  const { name, description, completed, actions } = props.project;
  return (
    <div className="project-card">
      <h2>{name}</h2>
      <div className="project-description">
        Description: <em>{description}</em>
      </div>
      <div className="movie-metascore">
        Completed: <strong>{completed}</strong>
      </div>
      <h3>Actions</h3>

      {actions.map(action => (
        <div key={action.id} className="project-action">
          {action}
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;