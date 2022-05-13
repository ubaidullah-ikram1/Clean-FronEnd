import * as R from 'redux'
const ndvidate = (state = null  , action) => {
return action.type == 'ndvi' ? state = action.ndvi : state = state
}
const selectndvi = (state   , action) => {
return action.type == 'index' ? state = action.index : state = state
}
const ndvis = R.createStore(ndvidate)
const selectionndvi = R.createStore(selectndvi)
export {ndvis,selectionndvi}