import taskReducer, {removeTaskAC, addTaskAC,
   changeStatusTaskAC, updatExistTaskAC, addTodoTasksAC, deleteAllTasksOfChooseTodoAC} from './taskReducer';

import todolistsReducer, {AddTodoAC} from './todolistReducer'

   import {tasksType, todolistsType} from '../App';


   test('correct task should be deleted from correct array', ()=>{
    const startState:tasksType = {
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    }
    
    const endState = taskReducer(startState, removeTaskAC('todolistID1', '1'))

    expect(endState).toEqual({
      'todolistID1': [
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    })

  })



  test('correct task should be added to correct array', () => {
    const startState = {
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    }
    const endState = taskReducer(startState, addTaskAC('todolistID1', 'купить кролика','10'))
    expect(endState["todolistID1"].length).toBe(6);
    expect(endState["todolistID1"][0].step).toBe('купить кролика');
    expect(endState).toEqual({
      
      'todolistID1': [
        { id: '10', step: "купить кролика", isDone: false },
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    })
  })

  test('status of specified task should be changed', () => {
    const startState = {
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    }

    const endState= taskReducer(startState,changeStatusTaskAC('todolistID2', '1', false))

    expect(endState).toEqual({
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: false },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    })
  })

  test('ids should be equals when todi is added', () => {
    const startStateTasks: tasksType= {
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    }

    const startStateTodo:Array<todolistsType>=[
      { id: 'todolistID1', title: 'What to learn', filter: 'All' },
      { id: 'todolistID2', title: 'What to buy', filter: 'All' },
    ]

    const endStateTasks= taskReducer(startStateTasks, addTodoTasksAC('todolistID3',  'новый туду'))
    const endStateTodo= todolistsReducer(startStateTodo, AddTodoAC('todolistID3',  'новый туду'))

    const keys = Object.keys(endStateTasks);
    const idFromTasks = keys[2];
    const idFromTodolists = endStateTodo[2].id;
 
    expect(idFromTasks).toBe('todolistID3');
    expect(idFromTodolists).toBe('todolistID3');

  })

  test('new array should be added when new todolist is added', () => {
    const startStateTasks: tasksType = {
      'todolistID1': [
        { id: '1', step: "HTML&CSS", isDone: true },
        { id: '2', step: "JS", isDone: true },
        { id: '3', step: "ReactJS", isDone: false },
        { id: '4', step: "Rest API", isDone: false },
        { id: '5', step: "GraphQL", isDone: false },
      ],
  
      'todolistID2': [
        { id: '1', step: "HTML&CSS2", isDone: true },
        { id: '2', step: "JS2", isDone: true },
        { id: '3', step: "ReactJS2", isDone: false },
        { id: '4', step: "Rest API2", isDone: false },
        { id: '5', step: "GraphQL2", isDone: false },
      ]
    }

    const endStateTasks= taskReducer(startStateTasks, addTodoTasksAC('todolistID3',  'новый туду'))

    const keys = Object.keys(endStateTasks);
    const newKey = keys.find(k => k != "todolistID1" && k != "todolistID2");
    if (!newKey) {
        throw Error("new key should be added")
    }
 
    expect(keys.length).toBe(3);
    expect(endStateTasks[newKey]).toEqual([]);
 });

 test('property with todolistId should be deleted', () => {
  const startStateTasks: tasksType = {
    'todolistID1': [
      { id: '1', step: "HTML&CSS", isDone: true },
      { id: '2', step: "JS", isDone: true },
      { id: '3', step: "ReactJS", isDone: false },
      { id: '4', step: "Rest API", isDone: false },
      { id: '5', step: "GraphQL", isDone: false },
    ],

    'todolistID2': [
      { id: '1', step: "HTML&CSS2", isDone: true },
      { id: '2', step: "JS2", isDone: true },
      { id: '3', step: "ReactJS2", isDone: false },
      { id: '4', step: "Rest API2", isDone: false },
      { id: '5', step: "GraphQL2", isDone: false },
    ]
  }

  const endState = taskReducer(startStateTasks, deleteAllTasksOfChooseTodoAC('todolistID1'))
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistID1"]).not.toBeDefined();

});


test('check update exist task', () => {
  const startStateTasks: tasksType = {
    'todolistID1': [
      { id: '1', step: "HTML&CSS", isDone: true },
      { id: '2', step: "JS", isDone: true },
      { id: '3', step: "ReactJS", isDone: false },
      { id: '4', step: "Rest API", isDone: false },
      { id: '5', step: "GraphQL", isDone: false },
    ],

    'todolistID2': [
      { id: '1', step: "HTML&CSS2", isDone: true },
      { id: '2', step: "JS2", isDone: true },
      { id: '3', step: "ReactJS2", isDone: false },
      { id: '4', step: "Rest API2", isDone: false },
      { id: '5', step: "GraphQL2", isDone: false },
    ]
  }

  const endState = taskReducer(startStateTasks, updatExistTaskAC('todolistID1', '1', 'купить хомяка'))

  const x = endState['todolistID1'].find(obj=>obj.id==='1')

 if(!x) {
  throw Error("status was not updated")
 } 

 expect(x.step).toBe('купить хомяка')

});

 
 