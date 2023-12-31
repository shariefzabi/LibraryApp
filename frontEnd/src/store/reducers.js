const userData = {}
const todos = {}
const user = { token: '', username: '' }



export function JWTReducer(state = user, action) {

  const payload = action?.payload
  switch (action.type) {
    case 'setToken':
      console.log(payload)
      return payload

    default:
      return state;
  }
}


