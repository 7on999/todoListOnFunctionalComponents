
import todolistsReducer, {updateNameTodoAC, deleteTodoAC, AddTodoAC, ChangeFilterAC} from './todolistReducer'

import {todolistsType} from '../App';

test('property with todolistId should be deleted', () => {
 
  const startStateTodo:Array<todolistsType>=[
    { id: 'todolistID1', title: 'What to learn', filter: 'All' },
    { id: 'todolistID2', title: 'What to buy', filter: 'All' },
  ]

  const endState = todolistsReducer(startStateTodo, deleteTodoAC('todolistID1'))
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState.find(obj=>obj.id==='todolistsID1')).not.toBeDefined();
});



test('filter wasnot updated', () => {
 
  const startStateTodo:Array<todolistsType>=[
    { id: 'todolistID1', title: 'What to learn', filter: 'All' },
    { id: 'todolistID2', title: 'What to buy', filter: 'All' },
  ]

const endState = todolistsReducer(startStateTodo, ChangeFilterAC('todolistID1', 'Active'))
const findTask = endState.find((obj:todolistsType)=>obj.id==='todolistID1')

if (!findTask){
  throw Error("filter was not updated")
}
  expect(findTask.filter).toBe('Active');
});


test('title wasnot updated', () => {

  const startStateTodo:Array<todolistsType>=[
    { id: 'todolistID1', title: 'What to learn', filter: 'All' },
    { id: 'todolistID2', title: 'What to buy', filter: 'All' },
  ]

const endState = todolistsReducer(startStateTodo, updateNameTodoAC('todolistID1', 'new title'))
const findTask = endState.find((obj:todolistsType)=>obj.id==='todolistID1')

if (!findTask){
  throw Error("filter was not updated")
}
  expect(findTask.title).toBe('new title');
});


test('task wasnot added', () => {

  const startStateTodo:Array<todolistsType>=[
    { id: 'todolistID1', title: 'What to learn', filter: 'All' },
    { id: 'todolistID2', title: 'What to buy', filter: 'All' },
  ]

const endState = todolistsReducer(startStateTodo, AddTodoAC('todolistID3', 'new task'))
const findTask = endState.find((obj:todolistsType)=>obj.id==='todolistID3')

if (!findTask){
  throw Error("task wasnot added becouse it isnot exist")
}
  expect(findTask.title).toBe('new task');
  expect(endState.length).toBe(3);
  expect(endState).toEqual([
    { id: 'todolistID1', title: 'What to learn', filter: 'All' },
    { id: 'todolistID2', title: 'What to buy', filter: 'All' },
    { id: 'todolistID3', title: 'new task', filter: 'All' },
  ]);

});

