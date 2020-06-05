import React from 'react';
import { addItem } from '../actions';
import { connect } from 'react-redux';

const AddButton = ({addItem}) => { 
  let addInput;

  const handleClick = () => {
    const text = addInput.value.trim();
    if (!text) {
      return alert('Empty item!');
    }
    const id = Math.floor(Math.random() * 10000);
    addInput.value = '';
    return addItem(text, id);
  };

  const handleKeyPress = (target) => {
    if(target.charCode === 13){
      handleClick();
    }
  }

  return (
    <React.Fragment>
      <input
        type = "text" 
        className = "input-box"
        placeholder = "Add todo"
        ref = { value => addInput = value }
        onKeyPress = { handleKeyPress }
      />
      <button 
        className = "add-button"
        onClick = { handleClick }
      >
        Add
      </button>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: (value, id) => dispatch(addItem(value, id))
})

export default connect(
  null,
  mapDispatchToProps
)(AddButton)
