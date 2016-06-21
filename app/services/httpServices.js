/**
 * Created by uahmed on 5/18/2015.
 */
myApp.service('HttpServices', ['$http', '$q', '$location', function (http, q, $location) {
    // Return public API.
    // --- API PATHS
    var baseUrl = 'http://demo8.folio3.com:8085/Service.svc/json/',
    // 'http://10.164.25.42:8088/Vizdum_api/public/',
        restPaths = {
            echo: {
                get: 'echo/Hello'
            },
            Plist: {
                get: 'PList'
            },
            Tlist: {
                get: 'Tlist'
            },
            login: {
                set: 'auth'
            },
            history: {
                get: 'History/'
            },
            lines: {
                get: 'POLines/'
            }
        };

    return ({
        get: getDataRest,
        set: setDataRest,
        update: updateDataRest,
        delete: removeDataRest
    });

    function getApiPath(module, action) {
        var moduleKey = restPaths[module];
        if (moduleKey && moduleKey[action]) {
            if (module == "widgetForm")
                return moduleKey[action];
            return baseUrl + moduleKey[action];
        }
        else
            return undefined;
    }

    // ---

    // ---
    // HEADERS
    function getHeaders() {
        return {
            //'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": decodeURIComponent(Helper.getCookie('auth_token'))
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    // ---

    // ---
    // PUBLIC METHODS.
    // ---

    function getUrl(module, action) {
        return getApiPath(module, action);
    }

    // get data from the rest API
    function getDataRest(jsonObj) {
        jsonObj.method = jsonObj.method ? jsonObj.method : 'get';
        var url = getUrl(jsonObj.module, jsonObj.method);

        if(jsonObj.postUrl) {
            url += jsonObj.postUrl;
        }

        return requestHandle({
            method: "get",
            url: url,
            params: jsonObj.param,
            headers: getHeaders()
        });
    }

    // set data to the Rest API
    function setDataRest(jsonObj) {
        var url = getUrl(jsonObj.module, 'set');

        if (jsonObj.param) {
            url += jsonObj.param;
        }

        return requestHandle({
            method: "post",
            url: url,
            params: {
                action: "add"
            },
            data: jsonObj.data,
            headers: getHeaders()
        });
    }

    // update data to the Rest API
    function updateDataRest(jsonObj) {
        jsonObj.method = jsonObj.method || 'put';
        var url = getUrl(jsonObj.module, jsonObj.method);
        if (jsonObj.param) {
            url += jsonObj.param;
        }

        return requestHandle({
            method: "put",
            url: url,
            params: {
                action: "edit"
            },
            data: jsonObj.data,
            headers: getHeaders()
        });
    }

    // Remove data from the Rest API
    function removeDataRest(jsonObj) {
        jsonObj.method = jsonObj.method || 'delete';
        var url = getUrl(jsonObj.module, jsonObj.method);
        if (jsonObj.param) {
            url += jsonObj.param;
        }

        return requestHandle({
            method: "DELETE",
            url: url,
            params: {
                action: "DELETE"
            },
            headers: getHeaders()
        });
    }

    function requestHandle(requestConfig){
        var request = http(requestConfig);
        return ( request.then(handleSuccess, handleError) );
    }
    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError(response) {
        console.log(response);
        if(response) {
            if(response.status == 401) {
                $location.path('/login');
                window.alert(response.data.ErrorMessage[0]);
            }
        }
        //console.log(response);
        /*var errorText = response.statusText;
        switch (response.status) {
            case 401:
                errorText = "<b>Oops! Something went wrong.</b>";
                break;
            case 400:
                errorText = (response.data && response.data.message) ? response.data.message: errorText;
                break;
        }

        if(errorText == undefined || errorText.isBlank()) {
            errorText = "<b>Oops! Something went wrong.</b></br>Please try again or try refreshing your browser."
        }

        Message.showAlert(errorText, function () {
            if(response.status == 401) {
                var base = window.location.href;
                base = base.substring(0, (base.indexOf('m/') + 1));
                window.location.href = base + "/wp-login.php";
            }
        });

        Helper.unblockUI('.app_loader');*/

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.

        if (
            !angular.isObject(response.data) || !response.data.message
        ) {
            return ( q.reject("An unknown error occurred.") );
        }

        // Otherwise, use expected error message.
        return ( q.reject(response.data.message) );
    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {
        return ( response.data );
    }
}]);



