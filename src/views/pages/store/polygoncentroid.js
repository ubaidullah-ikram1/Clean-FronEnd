import * as R from 'redux'
const lats = (state = null  , action) => {
    console.log('latt',action.lat)
return action.type == 'lat' ? state = action.lat : state = state
}
const lng = (state = null  , action) => {
return action.type == 'lng' ? state = action.lng : state = state
}
const latt = R.createStore(lats)
const lngt = R.createStore(lng)
export {latt,lngt}