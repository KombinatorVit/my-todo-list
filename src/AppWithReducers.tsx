import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {


    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    });

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {


        dispatchToTodolistReducer(changeTodolistFilterAC(todolistID, value));


    }

    function removeTask(id: string, todolistId: string) {

        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action);

    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action);


    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
    }


    function removeTodolist(id: string) {
        dispatchToTodolistReducer(removeTodolistAC(id));
        dispatchToTasksReducer(removeTodolistAC(id))
    }


    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, newTitle));
    };

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>            {todolists.map(t => {

                    let taskForTodolist = tasks[t.id];

                    if (t.filter === 'active') {
                        taskForTodolist = tasks[t.id].filter(t => !t.isDone);
                    }
                    if (t.filter === 'completed') {
                        taskForTodolist = tasks[t.id].filter(t => t.isDone);
                    }

                    return (<Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    tasks={taskForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={t.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />;
                            </Paper>
                        </Grid>

                    )
                        ;
                })}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithReducers;


