import * as R from 'redux'

const maps = (state  , action) => {

return action.type == 'map' ? state = action.map : state = state

}

const mapcontainer = R.createStore(maps)

export {mapcontainer}