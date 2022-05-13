import * as R from 'redux'
const ndvidate = (state = null  , action) => {
return action.type == 'ndvi' ? state = action.ndvi : state = state
}
const selectndvi = (state = null  , action) => {
return action.type == 'lng' ? state = action.lng : state = state
}
const ndvis = R.createStore(ndvidate)
const selectionndvi = R.createStore(selectndvi)
export {ndvis,selectionndvi}