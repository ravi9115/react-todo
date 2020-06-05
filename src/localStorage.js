export const loadState = () => {
	console.log('inside loadState')
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};


export const saveState = (state) => {
	console.log('inside saveState')
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};