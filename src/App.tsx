import React from 'react';
import './App.css';
import Todo from './Todo/Todo';
import AddItemForm from './components/AddTask';
import { filterValueType } from './Todo/Todo';
import { generate } from 'shortid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Paper, Container } from '@mui/material';
import todolistsReducer, {updateNameTodoAC, deleteTodoAC, AddTodoAC, ChangeFilterAC} from './redux/todolistReducer';
import taskReducer, {addTodoTasksAC, deleteAllTasksOfChooseTodoAC, updatExistTaskAC, changeStatusTaskAC, addTaskAC, removeTaskAC } from './redux/taskReducer';


export type todolistsType = {
  id: string,
  filter: filterValueType,
  title: string
}

export type taskType = {
  id: string,
  step: string,
  isDone: boolean
}

export type tasksType = {
  [todolistID:string]: Array<taskType>
}


function App() {

  let todolistID1 = generate();
  let todolistID2 = generate();

  // let [todolists, setTodolists] = React.useState<Array<todolistsType>>([
  //   { id: todolistID1, title: 'What to learn', filter: 'All' },
  //   { id: todolistID2, title: 'What to buy', filter: 'All' },
  // ])


  let [todolists, dispatchTodolists] = React.useReducer( todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
  ])




  const [tasks, dispatchTasks]=React.useReducer(taskReducer, {
    [todolistID1]: [
      { id: generate(), step: "HTML&CSS", isDone: true },
      { id: generate(), step: "JS", isDone: true },
      { id: generate(), step: "ReactJS", isDone: false },
      { id: generate(), step: "Rest API", isDone: false },
      { id: generate(), step: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: generate(), step: "HTML&CSS2", isDone: true },
      { id: generate(), step: "JS2", isDone: true },
      { id: generate(), step: "ReactJS2", isDone: false },
      { id: generate(), step: "Rest API2", isDone: false },
      { id: generate(), step: "GraphQL2", isDone: false },
    ]
  })

  // let [tasks, setTasks] = React.useState({

  //   [todolistID1]: [
  //     { id: generate(), step: "HTML&CSS", isDone: true },
  //     { id: generate(), step: "JS", isDone: true },
  //     { id: generate(), step: "ReactJS", isDone: false },
  //     { id: generate(), step: "Rest API", isDone: false },
  //     { id: generate(), step: "GraphQL", isDone: false },
  //   ],
  //   [todolistID2]: [
  //     { id: generate(), step: "HTML&CSS2", isDone: true },
  //     { id: generate(), step: "JS2", isDone: true },
  //     { id: generate(), step: "ReactJS2", isDone: false },
  //     { id: generate(), step: "Rest API2", isDone: false },
  //     { id: generate(), step: "GraphQL2", isDone: false },
  //   ]
  // });


  const removeStep = (todolistsID: string, id: string): void => {
    // const newTasks = { ...tasks, [todolistsID]: tasks[todolistsID].filter(t => t.id !== id) }
    dispatchTasks(removeTaskAC(todolistsID, id))
    // setTasks(newTasks)
  }

  const addTask = (todolistsID: string, newTask: string): void => {
    let id = generate();
    dispatchTasks(addTaskAC(todolistsID, newTask, id))
    // setTasks({ ...tasks, [todolistsID]: [{ id: generate(), isDone: false, step: newTask }, ...tasks[todolistsID]] })
  }

  const changeStatusTask = (todolistsID: string, id: string, isDone: boolean) => {
    dispatchTasks(changeStatusTaskAC(todolistsID, id, isDone))
    // const newTasks = { ...tasks, [todolistsID]: tasks[todolistsID].map(t => t.id === id ? { ...t, isDone: isDone } : t) }
    // setTasks(newTasks)
  }


  const changeFilter = (todolistsID: string, filterValue: filterValueType) => {
    dispatchTodolists(ChangeFilterAC(todolistsID,filterValue))
    // let newTodoList = todolists.map(tl => tl.id === todolistsID ? { ...tl, filter: filterValue } : tl)
    // setTodolists(newTodoList)
  }

  const removeTodoList = (todolistID: string) => {
    dispatchTodolists(deleteTodoAC(todolistID))
    dispatchTasks(deleteAllTasksOfChooseTodoAC(todolistID))
    // setTodolists(todolists.filter(t => t.id !== todolistID))
  }

  const addTodo = (title: string) => {
    let newIdTodo = generate();
    // let newIdTask1 = generate();
    // let newIdTask2 = generate();
    dispatchTodolists(AddTodoAC(newIdTodo, title))
    dispatchTasks(addTodoTasksAC(newIdTodo, title))
    // dispatchTasks(addTodoTasksAC(newIdTodo, newIdTask1, newIdTask2, title))

    
    // setTodolists([{ id: newId, title: title, filter: 'All' }, ...todolists]);
    // setTasks({
    //   ...tasks, [newId]: [{ id: generate(), step: "HTML&CSS", isDone: true },
    //   { id: generate(), step: "JS", isDone: true },]
    // })
  }

  const updatExistTask = (todolistsID: string, id: string, title: string) => {
    dispatchTasks(updatExistTaskAC(todolistsID, id, title))
    // setTasks({ ...tasks, [todolistsID]: tasks[todolistsID].map(t => t.id === id ? { ...t, step: title } : t) })
  }

  const updateNameTodoList = (todolistID: string, title: string) => {
    dispatchTodolists(updateNameTodoAC(todolistID, title))
    // setTodolists(todolists.map(t => t.id === todolistsID ? { ...t, title: title } : t))
  }


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fixed>
        <Grid container style={{padding:'20px'}}>
          <AddItemForm callback={addTodo} placeholder={'название нового тудулиста'} />
        </Grid>

        <Grid container spacing={8}>
          {todolists.map((t: todolistsType) => {

            let tasksForTodo = JSON.parse(JSON.stringify(tasks[t.id]));

            if (t.filter === 'Active') {
              tasksForTodo = tasks[t.id].filter(t => t.isDone === false)
            }
            if (t.filter === 'Done') {
              tasksForTodo = tasks[t.id].filter(t => t.isDone === true)
            }
            return (
              <Grid item>
                <Paper style={{padding:'10px'}}>
                  <Todo key={t.id} todolistsID={t.id} title={t.title} filter={t.filter} tasks={tasksForTodo}
                    changeStatusTask={changeStatusTask}
                    removeStep={removeStep}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    removeTodoList={removeTodoList}
                    updatExistTask={updatExistTask}
                    updateNameTodoList={updateNameTodoList}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;



