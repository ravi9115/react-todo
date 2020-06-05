import React from 'react';
import { connect } from 'react-redux';
import { searchItem } from '../actions';

const SearchInput = ({searchItem}) => {
  const handleChange = (input) => {
    searchItem(input.target.value)
  }
    
  return (
    <React.Fragment>
      <input 
        type = "text" 
        className = "search-box"
        placeholder = "Search"
        onChange = { handleChange }
      />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  searchItem: text => dispatch(searchItem(text))
})

export default connect(
  null,
  mapDispatchToProps
)(SearchInput)
