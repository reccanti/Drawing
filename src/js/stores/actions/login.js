require("fetch");

store.dispatch({
    type: "LOGIN_WAITING"
});

// perform ajax
$.ajax({
    cache: false,
    type: "POST",
    url: "/login",
    data: data,
    dataType: "json",
    success: function(result, status, xhr) {
        store.dispatch({
            type: "LOGIN_SUCCESS",
            results: result
        });
        browserHistory.push("/"); // redirect to root after logging in
    },
    error: function(xhr, status, error) {
        var errormsg = JSON.parse(xhr.responseText);
        store.dispatch({
            type: "LOGIN_FAILURE",
            error: errormsg
        });
    }
});

var send = function(data) {
    
}