import * as R from 'redux'

const red = (state = null , action) => {

return action.type == 'msidn' ? state = action.msidn : state = state

}

const Msidn = R.createStore(red)

export {Msidn}