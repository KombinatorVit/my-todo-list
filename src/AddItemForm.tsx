import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';


type AddItemFormPropsType = {
    addItem: (title:string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    function onAddTaskHandler() {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required!')
        }

    }


    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            onAddTaskHandler();
        }
    }


    return(
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton  style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} color='primary' onClick={onAddTaskHandler}>+</IconButton>
        </div>


    )
}

export default AddItemForm;