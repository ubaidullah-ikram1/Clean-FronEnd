import * as R from 'redux'

const layer = (state = null , action) => {
   
return action.type == 'ndmilayerss' ? state = action.ndmilayerss : state = state

}

const ndmilayerss = R.createStore(layer)

export {ndmilayerss}