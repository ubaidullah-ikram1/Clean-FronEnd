// import * as R from 'redux'

// const red = (state = [] , action) => {

// return action.type == 'date' ? state = action.date : state = state

// }
// const cloucoverddate = (state  , action) => {

//     return action.type == 'clouddates' ? state = action.clouddates : state = state
//     }
// const datestore = R.createStore(red)
// const clouddate = R.createStore(cloucoverddate)
import * as R from 'redux'
const red = (state = [] , action) => {
return action.type == 'date' ? state = action.date : state = state
}
const datestore = R.createStore(red)

export {datestore}