/*
 * XMLHttpRequest
 */
(function (exports) {
    if (exports.XMLHttpRequest) {
        return;
    }
    exports.XMLHttpRequest = Java.type('io.milton.cloud.server.repoapps.http.XMLHttpRequest');
})(this);


/*
 * FormData
 */
(function (exports) {
    if (exports.FormData) {
        return;
    }
    exports.FormData = Java.type('io.milton.cloud.server.repoapps.http.FormData');
})(this);