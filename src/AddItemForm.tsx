import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error': ''}
            />
            <button onClick={onAddTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>


    )
}

export default AddItemForm;