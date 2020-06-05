const searchItem = (state = '', action) => {
	switch (action.type) {
    case 'SEARCH_ITEM':
      if (!action.text) {
        return ''
      }
      return action.text
    default:
      return state
	}
}

export default searchItem;
