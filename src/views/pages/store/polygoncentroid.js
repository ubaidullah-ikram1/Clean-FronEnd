import * as R from 'redux'
const red = (state = null  , action) => {
return action.type == 'lat' ? state = action.lat : state = state
}
const lng = (state = null  , action) => {
return action.type == 'lng' ? state = action.lng : state = state
}
const lat = R.createStore(red)
const lngt = R.createStore(lng)
export {lat,lngt}