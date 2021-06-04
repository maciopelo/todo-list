import { counterConstants } from "../constants/counter.constants"


export const incrementCounter = () => {
    return {
        type: counterConstants.INCREMENT
    }
}

export const decrementCounter = () => {
    return {
        type: counterConstants.DECREMENT
    }
}