const loadReducer = (state = 100, action) => {
    switch (action.type) {
        case 'LOAD_MORE':
            console.log("LOADING!")
            return state
        default:
            return state
    }
}
export default loadReducer