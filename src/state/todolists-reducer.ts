import {TodolistsType} from '../App';
import {v1} from 'uuid';

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
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
        default:
            throw new Error('I don\'t understand this type');
    }
};

