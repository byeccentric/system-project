export default function reducer(state={
    todayPlans: [],
    weekPlans: [],
    pastPlans: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_PLANS": {
            return {...state, fetching: true}
        }
        case "FETCH_PLANS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_PLANS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                todayPlans: action.payload.today,
                weekPlans: action.payload.week,
                pastPlans: action.payload.past,
            }
        }
        case "COMMENT_PLAN_SUCCESS": {
            state.todayPlans.findIndex(plan => {
                if (parseInt(plan.id) === action.payload.id)
                    plan.comment = action.payload.comment;
                return plan;
            })
            return {
                ...state,
            }
        }
    }

    return state
}
