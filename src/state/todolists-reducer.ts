import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType):Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
         return   [
                ...state, {
            id: action.todolistId, title: action.title, filter: 'all'
            }
            ]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(td => td.id === action.id ? {...td, title: action.title} : td)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        }
        default:
            throw new Error('I don\'t understand this type');
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title }
}

export const changeTodolistFilterAC = (id: string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter }
}


