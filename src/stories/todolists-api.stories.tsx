

import React, {MouseEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from '../api/ todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.createTodolist('MyrMaa').then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.deleteTodolist('\'0c10c1ba-ad0b-48e0-ac26-73f83dcf30b2\'').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const todolistId = '7cba76a9-bb26-4201-b525-022e4dc90f5b'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.updateTodolist(todolistId, 'Сладкая булочка').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })



    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        useEffect(() => {

            todolistAPI.deleteTask(todolistId, taskId)
                .then((res) => {
                    setState(res.data)
                })



        }, [])
    };

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
    <button onClick={onButtonClick}>Delete Task</button>
    </div>
}