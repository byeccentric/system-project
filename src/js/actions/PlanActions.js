export function createPlan(item) {
    return function(dispatcher) {
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
        item.id = Math.round(Math.random() * 50);
        dispatcher.dispatch({
            type: "CREATE_FTP",
            payload: item
        });
    }
}

export function deletePlan(id) {
    return function(dispatcher) {
        /*$.post(
            'http://test.byeccentric.pw/ajax.php', {
                mod: 'ftps',
                cmd: 'edit',
                type: 'delete',
                id
            },
            function() {
                dispatcher.dispatch({
                    type: "DELETE_FTP",
                    id,
                });
            },
            'json'
        );*/
        dispatcher.dispatch({
            type: "DELETE_FTP",
            payload: id,
        });
    }
}

export function getPlans() {
    return function(dispatch) {
        $.post(
            'http://test.byeccentric.pw/ajax.php',
            {
                mod: 'plan',
                cmd: 'get',
            },
            function (data) {
                dispatch({
                    type: "FETCH_PLANS_FULFILLED",
                    payload: data
                });
            },
            'json'
        );
    }
}

export function commentPlan(id, comment) {
    return function (dispatch) {
        $.post(
            'http://test.byeccentric.pw/ajax.php',
            {
                mod: 'plan',
                cmd: 'comment',
                id: id,
                comment: comment
            },
            function () {
                dispatch({
                    type: "COMMENT_PLAN_SUCCESS",
                    payload: {
                        id: id,
                        comment: comment
                    }
                });
            }
        );
    }

}
