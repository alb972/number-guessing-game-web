export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export interface CounterStoreInterface {
    initValue: number;
}

export interface DecrementAction {
    type: typeof DECREMENT;
}

export interface IncrementAction {
    type: typeof INCREMENT;
}

export type CounterActionTypes = DecrementAction | IncrementAction;