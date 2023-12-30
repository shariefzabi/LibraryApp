import React, { useReducer } from 'react';

export default function Red() {
  const initialState = { count: 1 };
  const reducer = (initialState = { count: 1 }, action) => {
    switch (action.type) {
      case 'increment':
        return { ...initialState, count: initialState.count + 1 };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>{state.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>button</button>
    </>
  );
}
