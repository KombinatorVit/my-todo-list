import React, {useState, ChangeEvent} from 'react';
import {TextField} from '@mui/material';


type EditableSpanPropsType = {
    title:string
    onChange: (newValue: string) => void
}
function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)

    };
    const activateViewMode = () => {
        setEditMode(false)
    props.onChange(title)
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <TextField variant={'outlined'}  value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}

export default EditableSpan;