

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
    const [todolistId, setTodolistId] = useState<any>('')


    function getTasks(){ todolistAPI.getTasks(todolistId)
        .then((res) => {
            setState(res.data)
        })}
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>

        <button onClick={getTasks}>Get Task</button>

    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {

            todolistAPI.deleteTask(todolistId, taskId)
                .then((res) => {
                    setState(res.data)
                })



    };

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
    <button onClick={onButtonClick}>Delete Task</button>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const createTask = () => {


            todolistAPI.createTask(todolistId, taskTitle)
                .then((res) => {
                    console.log(res);
                    setState(res.data)
                })

    };

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Task Title'} value={taskTitle} onChange={(e)=> setTaskTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>CreateTask</button>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>('')
    const [taskDescription, setDescription] = useState<any>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const createTask = () => {


        todolistAPI.updateTask(todolistId, taskId, {
            status: status,
            deadline: '',
            priority: priority,
            startDate: '',
            title: taskTitle,
            description: taskDescription
        })
            .then((res) => {
                console.log(res);
                setState(res.data)
            })

    };

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
        <input placeholder={'Task Title'} value={taskTitle} onChange={(e)=> setTaskTitle(e.currentTarget.value)}/>
        <input placeholder={'taskDescription'} value={taskDescription} onChange={(e)=> setDescription(e.currentTarget.value)}/>
        <input placeholder={'status'} value={status} onChange={(e)=> setStatus(+e.currentTarget.value)}/>
        <input placeholder={'priority'} value={priority} onChange={(e)=> setPriority(+e.currentTarget.value)}/>
        <input placeholder={'startDate'} value={startDate} onChange={(e)=> setStartDate(e.currentTarget.value)}/>
        <input placeholder={'deadline'} value={deadline} onChange={(e)=> setDeadline(e.currentTarget.value)}/>
        <button onClick={createTask}>CreateTask</button>
    </div>
}