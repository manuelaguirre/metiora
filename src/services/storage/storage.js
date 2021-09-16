export const addAction = (action) => {
  const actions = JSON.parse(localStorage.getItem("actions"));
  if (!actions) {
    localStorage.setItem("actions", JSON.stringify([action]));
    return;
  }
  actions.push(action)
  localStorage.setItem("actions", JSON.stringify(actions));
};

export const getActions = () => {
  return JSON.parse(localStorage.getItem("actions"));
};
