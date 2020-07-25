import React from "react";

interface Props {
  min?: number;
  max?: number;
}

interface UseLoopCounter {
  count: number;
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
}

interface ReducerState {
  min: number;
  max: number;
  count: number;
}
interface BaseAction {
  type: string;
  amount: number;
}
interface SetMinAction extends BaseAction {
  type: "setmin";
}
interface SetMaxAction extends BaseAction {
  type: "setmax";
}
interface IncrementAction extends BaseAction {
  type: "increment";
}
interface DecrementAction extends BaseAction {
  type: "decrement";
}
type Action = SetMinAction | SetMaxAction | IncrementAction | DecrementAction;

const reducer = (
  state: ReducerState,
  { type, amount = 1 }: Action
): ReducerState => {
  switch (type) {
    case "setmin": {
      return {
        ...state,
        min: amount,
        count: state.count >= amount ? state.count : amount,
      };
    }
    case "setmax": {
      return {
        ...state,
        count: state.count <= amount ? state.count : amount,
        max: amount,
      };
    }
    case "increment": {
      let count = state.count + amount;
      if (count > state.max) {
        count -= state.max - state.min + 1;
      }
      return {
        ...state,
        count,
      };
    }
    case "decrement": {
      let count = state.count - amount;
      if (count < state.min) {
        count += state.max - state.min + 1;
      }
      return {
        ...state,
        count,
      };
    }
  }
};

const useLoopCounter = ({ min = 0, max = 100 }: Props): UseLoopCounter => {
  const [{ count }, dispatch] = React.useReducer(reducer, {
    min,
    max,
    count: min,
  });

  React.useEffect(() => dispatch({ type: "setmin", amount: min }), [min]);
  React.useEffect(() => dispatch({ type: "setmax", amount: max }), [max]);

  return {
    count,
    increment: React.useCallback(
      (amount: number = 1) => dispatch({ type: "increment", amount }),
      []
    ),
    decrement: React.useCallback(
      (amount: number = 1) => dispatch({ type: "decrement", amount }),
      []
    ),
  };
};

export default useLoopCounter;
