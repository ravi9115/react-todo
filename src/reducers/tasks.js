const tasks = (state = [], action) => {
	switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          status: 'Active'
        }
      ]
    case 'REMOVE_ITEM':
      return [
        ...state.filter(item => item.id !== action.id)
      ]
    case 'CLEAR_LIST':
      return []
    case 'SORT_TABLE':
      let arr1 = []
      for (var i = 0; i < action.arr.length; i++) {
        arr1[i]= JSON.parse(action.arr[i])
      }
      return arr1
    case 'TOGGLE_ITEM':
      const objIndex = state.findIndex(obj => obj.id === action.id);
      const toggledStatus = 
        state[objIndex].status === 'Active' ? 'Completed' : 'Active'
      const updatedObj = { ...state[objIndex], status: toggledStatus} 
      return [
        ...state.slice(0,objIndex),
        updatedObj,
        ...state.slice(objIndex+1),
      ]
    default:
      return state
	}
}

export default tasks;
