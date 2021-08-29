import {
    INCREMENT,
    DECREMENT,
    CounterActionTypes,
} from "../model/redux/Counter";

export function inctCounter(): CounterActionTypes {
    return { type: INCREMENT };
}

export function dectCounter(): CounterActionTypes {
    return { type: DECREMENT };
}