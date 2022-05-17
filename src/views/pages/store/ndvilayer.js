import * as R from 'redux'

const layer = (state = null , action) => {

return action.type == 'layerss' ? state = action.layerss : state = state
console.log('layer',action.layerss)
}

const ndvilayer = R.createStore(layer)

export {ndvilayer}