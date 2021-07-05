const initialState =  {
    projects: {
        name: "",
        description: "",
        completed: false,
        actions: []
    }
}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default listsReducer;