
import React from 'react';
import AddItemForm from './AddItemForm';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Task status change')
const changeTaskTitleCallback = action('Task title change')
const removeTaskCallback = action('Task removed')


export const TaskBaseExample = () => {
return <><Task
               changeTaskStatus={changeTaskStatusCallback}
               changeTaskTitle={changeTaskTitleCallback}
               removeTask={removeTaskCallback}
               task={{id:'1', isDone: false, title: 'HPPPPT'}}
               todolistId={'todolistId1'}
/>

    <Task
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        task={{id:'2', isDone: true, title: 'ровне'}}
        todolistId={'todolistId2'}
    /></>
}