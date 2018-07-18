import {combineReducers} from "redux"

import ftps from "./ftpsReducer"
import plans from "./plansReducer"

export default combineReducers({
    plans,
    ftps
})
