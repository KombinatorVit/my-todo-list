import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import AddItemForm from './AddItemForm';

import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


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

function AppWithRedux() {


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {


        dispatch(changeTodolistFilterAC(todolistID, value));


    }, [dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {

        const action = removeTaskAC(id, todolistId);
        dispatch(action);

    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);


    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, [dispatch]);

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }, [dispatch]);


    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id));
    }, [dispatch]);


    let changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    }, [dispatch]);

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>            {todolists.map(t => {

                    let taskForTodolist = tasks[t.id];


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

export default AppWithRedux;


