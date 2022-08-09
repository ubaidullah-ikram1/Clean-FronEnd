import * as R from 'redux'
const x1 = (state = null , action) => {
    console.log(state)
return action.type == 'input' ? state = action.input : state = state
}
const x2 = (state = null , action) => {
    console.log(state)

    return action.type == 'input' ? state = action.input : state = state
    }
    const y1 = (state = null , action) => {
        console.log(state)

        return action.type == 'input' ? state = action.input : state = state
        }
        const y2 = (state = null , action) => {
            console.log(state)

            return action.type == 'input' ? state = action.input : state = state
            }
const x1data = R.createStore(x1)
const x2data = R.createStore(x2)
const y1data = R.createStore(y1)
const y2data = R.createStore(y2)

export {x1data,x2data,y1data,y2data}