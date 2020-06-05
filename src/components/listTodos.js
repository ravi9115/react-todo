import './components.css';
import React from 'react';
import { connect } from 'react-redux';
import Sortable from 'react-sortablejs';
import { removeItem, sortTable, toggleItem } from '../actions';
import DragIndicator from '@material-ui/icons/DragIndicator';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBox from '@material-ui/icons/CheckBox';


const filterItems = ({tasks, searchItem}) => {
  if (!searchItem.trim()) {
    return tasks;
  }
  return tasks.filter((item) => 
    item.text.toLowerCase().search(searchItem.toLowerCase()) !== -1
  )
}

const Task = ({task, removeItem, toggleItem}) => {
  const handleClick = () => {
    removeItem(task.id)
  }

  const handleCheckBox = () => {
    console.log('inside handleCheckBox')
    toggleItem(task.id)
  }

  return (
    <tr data-id={JSON.stringify(task)} className='items'>
      <td width="10%">
        <Checkbox
          icon={<CheckBoxOutlineBlank />} checkedIcon={<CheckBox />} 
          className='root'
          checked={task.status === 'Completed'? true : false}
          onChange={ handleCheckBox }
          color='black'
        />
      </td>
      <td width="60%">
        {task.text}
      </td>    
      <td width="20%">
        <span onClick={ handleClick }>&#10004;</span>
      </td>      
      <td width="20%" className="my-handle">
        <DragIndicator/>
      </td>
    </tr>          
  )
}

const TasksList = ({tasks, searchItem, removeItem, toggleItem, sortTable}) => {  
  if (!tasks.length) {
    return (
      <table width="100%">
        <tbody>
          <tr className="heading">
            <th>
              Todo list is empty
            </th>
          </tr>
        </tbody>
      </table>
    );
  }

  const taskList = filterItems({tasks, searchItem}).map(item => (
    <Task 
      key = { item.id }
      task = { item } 
      removeItem = { removeItem }
      toggleItem = { toggleItem }
    />
  ));

  return !taskList.length ? (
    <table width="100%">
      <tbody>
        <tr>
          <th className="heading">
            Not found!
          </th>
        </tr>
      </tbody>
    </table>
    ) : (
    <table width="100%">
        <Sortable
          tag="tbody"
          options={{
            handle: '.my-handle',
            animation: 150,
            filter: ".heading",
            preventOnFilter: true,
            draggable: ".items",
            /*onStart: function(evt) {
              const index = evt.oldIndex;
              console.log(index)
            }*/
          }}
          onChange={(order, sortable, evt) => {
            if (searchItem === '') {
              sortTable(order)
            }
          }}
        >
          <tr className="heading">
            <th width="10%">Status</th>
            <th width="50%">Task</th>
            <th width="20%">Remove</th>
            <th width="20%">Move</th>
          </tr>
          {taskList}
        </Sortable>
    </table>
  )
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  searchItem: state.searchItem
})

const mapDispatchToProps = dispatch => ({
  removeItem: id => dispatch(removeItem(id)),
  toggleItem: id => dispatch(toggleItem(id)),
  sortTable: arr => dispatch(sortTable(arr))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList)
