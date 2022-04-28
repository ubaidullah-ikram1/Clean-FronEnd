import * as R from 'redux'
const red = (state = null , action) => {
return action.type == 'search' ? state = action.id : state = state
}
const farmidcommunicator = R.createStore(red)
export {farmidcommunicator}