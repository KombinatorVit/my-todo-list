import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TasksType} from './App';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TasksType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    function removeTaskHandler() {
        props.removeTask(props.task.id, props.todolistId);
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId,);
    }, [props.task.id, props.changeTaskTitle, props.todolistId]);
    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color={'primary'}
                      checked={props.task.isDone}
                      onChange={onChangeStatusHandler}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton
                onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>


    );
});