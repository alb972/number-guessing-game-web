import { INCREMENT, DECREMENT, CounterActionTypes, CounterStoreInterface } from "../model/redux/Counter";

let initState: CounterStoreInterface = {
  initValue: 0,
};

function counter(state = initState, action: CounterActionTypes): CounterStoreInterface {
  let nextState: CounterStoreInterface | null = null;
  switch (action.type) {
    case INCREMENT:
      nextState = { initValue: state.initValue + 1 };
      return nextState || state;
    case DECREMENT:
      nextState = { initValue: state.initValue - 1 };
      return nextState || state;
    default:
      return state;
  }
}

export default counter;
