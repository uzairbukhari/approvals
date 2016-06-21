/**
 * Created by uahmed on 7/6/2015.
 */
function HelperFunctions() {
    var setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };

    var getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    };

    var removeCookie = function (cname, path, domain) {
        if ( getCookie( cname ) ) document.cookie = cname + "=" +
            ( ( path ) ? ";path=" + path : "") +
            ( ( domain ) ? ";domain=" + domain : "" ) +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    };

    var applyTheme = function (t_color) {
        var color = t_color ? t_color: $('div .theme-panel .theme-colors > ul > li.current').attr("data-style");
        var old_class = '';
        var new_class = 'color-'+color;

        var body_classes = $('body').attr('class');
        var body_classes_array = body_classes.split(' ');

        $.each(body_classes_array, function(index, value){
            if(value.match('^color-')){
                old_class = value;
            }
        });

        if(old_class != new_class){
            $('body').removeClass(old_class);
            $('body').addClass(new_class);

            $.post(siteURL+'/wp-admin/admin-ajax.php', {
                    "action": "change_metronic_color",
                    "data": {'color': color}
                }
            );
        }

        //region Setting Theme
        if(color == "default") {
            themeColors = highChartsTheme.default.colors;
            Highcharts.setOptions(highChartsTheme.default);
        } else {
            themeColors = highChartsTheme.whiteTheme.colors;
            Highcharts.setOptions(highChartsTheme.whiteTheme);
        }
        //endregion
    };

    var blockUI = function (areaToBlock, timeoutToUnblock) {
        Metronic.blockUI({
            target: areaToBlock,
            animate: true
        });

        if(timeoutToUnblock){
            window.setTimeout(function() {
                Metronic.unblockUI(areaToBlock);
            }, timeoutToUnblock);
        }

        return true;
    };

    var unblockUI = function (areaToUnblock) {
        Metronic.unblockUI(areaToUnblock);

        return false;
    };

    return {
        setCookie: setCookie,
        getCookie: getCookie,
        removeCookie: removeCookie,
        applyTheme: applyTheme,
        blockUI: blockUI,
        unblockUI: unblockUI
    }
}

var Helper = new HelperFunctions();