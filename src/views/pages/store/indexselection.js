import * as R from 'redux'

const index = (state = null , action) => {

return action.type == 'index' ? state = action.index : state = state

}

const indexselection = R.createStore(index)

export {indexselection}