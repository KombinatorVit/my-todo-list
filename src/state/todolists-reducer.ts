import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: string
}

type ActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {

            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
         return   [
                ...state, {
            id: v1(), title: action.title, filter: 'all'
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

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (id: string, title:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title }
}

export const ChangeTodolistFilterAC = (id: string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter }
}