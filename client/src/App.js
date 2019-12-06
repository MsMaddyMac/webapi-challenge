import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Projects/SavedList";
import ProjectList from "./Projects/ProjectList";
import Project from "./Projects/Project";


const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = project => {
    setSavedList([...savedList, project]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={ProjectList} />
      <Route
        path="/projects/:id"
        render={props => {
          return <Project {...props} addToSavedList={addToSavedList} />;
        }}
      />
      {/* <Route exact path="/update-movie/:id" component={UpdateForm} /> */}
    </>
  );
};

export default App;
