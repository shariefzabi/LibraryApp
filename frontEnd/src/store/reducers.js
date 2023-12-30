const userData = {}
const todos = {}
export function userReduce(state = userData, action) {
  const payload = action?.payload
  switch (action.type) {
    case 'addUSer':
      const user = { ...state.users, ...{ [payload.email]: payload.password } }
      return { ...state, users: user };

    case 'setUser':

      return { ...state, currentUser: payload }

    case 'changePassword':
      const ModifiedUser = { ...state.users, ...{ [payload.email]: payload.newPassword } }
      return { ...state, users: ModifiedUser };

    default:
      return state;
  }
}

export function toDoReducer(state = todos, action) {

  const currentUser = action?.payload?.currentUser;
  const todo = action?.payload?.todo?.[currentUser];
  const payload = action?.payload;
  switch (action.type) {

    case 'addTodo':

      const existingUser = Object.keys(state).includes(currentUser)
      if (existingUser) {
        const existingTodo = Object.assign([], state[currentUser])
        existingTodo.push(todo)
        return { ...state, [currentUser]: existingTodo }
      }
      else {

        return { ...state, [currentUser]: [todo] }
      }
    case 'ModifyTodo':
      if (currentUser) {
        return { ...state, [currentUser]: payload.todos }
      }
      return state
    default:
      return state;
  }
}



