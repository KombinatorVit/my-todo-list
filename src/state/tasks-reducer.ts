import {FilterValuesType, TasksStateType, TodolistsType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone:false
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {

           return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
       }
        case 'ADD-TASK' : {
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el) }


            // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)});

        }
        default:
            throw new Error('I don\'t understand this type');
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title,todolistId }
}
export const changeTaskStatusAC = (taskId: string,isDone:false, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId,isDone,todolistId }
}



