import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '17d54870-a5d6-48a5-87bc-30e6241cf46f',
    },
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    totalCount: number
    error: string | null
    Items: TaskType[]
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolist() {
        return instance.get <Array<TodolistType>>(
            'todo-lists'
        );
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(
            'todo-lists', {title}
        );
    },
    deleteTodolist(todolistId: string) {
        return instance.delete <ResponseType>(
            `todo-lists/${todolistId}`
        );
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`
        );
    },
    deleteTask(todolistId: string, title: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${title}`
        );
    },


    createTask(todolistId: string, taskTitle: string){
        return instance.post<ResponseType<TaskType>>(
        `todo-lists/${todolistId}/tasks/`, {title: taskTitle})},




    updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType){
return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};
