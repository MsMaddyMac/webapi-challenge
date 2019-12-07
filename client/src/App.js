import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import ProjectList from "./Projects/ProjectList";
import Project from "./Projects/Project";

import SavedList from "./Projects/SavedList";

const App = () => {
  const [savedList, setSavedList] = useState( [] );

  const addToSavedList = project => {
    setSavedList( [...savedList, project] );
  };

  return (
    <div>
      <SavedList list={savedList} />
      <div>
        <Route exact path="/" component={ProjectList} />
        <Route path="/projects/:id" 
          render={(props)=> 
          <Project{...props}
          addToSavedList={addToSavedList} />}
          />
      </div>
    </div>
  );
};

export default App;

