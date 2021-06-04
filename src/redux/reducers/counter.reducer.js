import { counterConstants } from "../constants/counter.constants"



export const counterReducer = (state = 0, action) => {

    switch (action.type) {

        case counterConstants.INCREMENT:
            return state + 1

        case counterConstants.DECREMENT:
            return state - 1

        default:
            return state
    }
}