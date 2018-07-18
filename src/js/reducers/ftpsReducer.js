export default function reducer(state={
    ftps: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_FTPS": {
            return {...state, fetching: true}
        }
        case "FETCH_FTPS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_FTPS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                ftps: action.payload,
            }
        }
        case "ADD_FTP": {
            return {
                ...state,
                ftps: [...state.ftps, action.payload],
            }
        }

        case "EDIT_FTP": {
            return {
                ...state,
                ftps: state.ftps.map(ftp => {
                    if (ftp.id === action.payload.id) {
                        ftp.id = action.payload.id;
                        ftp.login = action.payload.login;
                        ftp.name = action.payload.name;
                        ftp.password = action.payload.password;
                        ftp.server = action.payload.server;
                    }
                    return ftp;
                }),
            }
        }

        case "DELETE_FTP": {
            return {
                ...state,
                ftps: state.ftps.filter(ftp => parseInt(ftp.id) !== action.payload),
            }
        }
    }

    return state
}
