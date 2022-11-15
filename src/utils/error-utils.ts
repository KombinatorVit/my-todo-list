import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]));
    } else {
        dispatch(setErrorAC('some error occurred'));

    }
    dispatch(setStatusAC('failed'));
};

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occuarrd'));
    dispatch(setStatusAC('failed'));
};