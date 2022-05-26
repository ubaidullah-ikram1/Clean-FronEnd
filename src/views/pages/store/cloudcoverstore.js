import * as R from 'redux'
const red = (state  , action) => {
return action.type == 'cloudcover' ? state = action.cloudcover : state = state
}
const cloudcoverstore = R.createStore(red)

export {cloudcoverstore}