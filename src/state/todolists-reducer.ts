import {TodolistsType} from '../App';

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
 {
       return  state.filter(t=>t.id !== action.id)
}


        default:
            throw new Error('I don\'t understand this type')
    }
}
