export function editFtp(item) {
    return function(dispatch) {
        /*$.post(
            'http://test.byeccentric.pw/ajax.php', {
                mod: 'ftps',
                cmd: 'edit',
                type: item.type,
                id: item.id,
                name: item.name,
                login: item.login,
                password: item.password,
                server: item.server
            },
            function(data) {
                item.id = data.id;
                dispatcher.dispatch({
                    type: "CREATE_FTP",
                    data: item
                });
            },
            'json'
        );*/

        const type = item.type;

        if (type === 'add') {
            item.id = String(Math.round(Math.random() * 50));
        }
        delete item.type;

        dispatch({
            type: type.toUpperCase()+"_FTP",
            payload: item
        });

    }
}

export function deleteFtp(id) {
    return function(dispatch) {
        /*$.post(
            'http://test.byeccentric.pw/ajax.php', {
                mod: 'ftps',
                cmd: 'edit',
                type: 'delete',
                id
            },
            function() {
                dispatch({
                    type: "DELETE_FTP",
                    payload: id,
                });
            },
            'json'
        );*/

        dispatch({
            type: "DELETE_FTP",
            payload: id,
        });
    }
}

export function getFtps() {
    return function(dispatch) {
        $.post(
            'http://test.byeccentric.pw/ajax.php',
            {
                mod: 'ftps',
                cmd: 'get',
            },
            (data) => {
                dispatch({
                    type: "FETCH_FTPS_FULFILLED",
                    payload: data
                });
            },
            'json'
        )
    }
}
