import * as R from 'redux'
const index = (state=null  , action) => {
    console.log('action',action)
return action.type == 'indexis' ? state = action.indexis : state = state
}

const indexsel = R.createStore(index)

export {indexsel}