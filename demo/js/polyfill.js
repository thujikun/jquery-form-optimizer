(function() {
    var userAgent = window.navigator.userAgent.toLowerCase(),
        appVersion = window.navigator.appVersion.toLowerCase();

    if (userAgent.indexOf("msie") != -1) {
        if (appVersion.indexOf("msie 10.") === -1) {
            $(document).on('keydown paste cut', 'input, textarea', function(e) {
                if (
                    e.type !== 'keydown' ||
                    !(
                        e.keyCode === 9 ||
                        ((e.ctrlKey || e.metaKey) && (e.keyCode === 86 || e.keyCode === 88))
                    )
                ) {
                    setTimeout(function() {
                        $(e.target).trigger('input');
                    }, 1000 / 60);
                }
            });
        }
    }

    // polyfill for Array.forEach
    if (!('forEach' in Array.prototype)) {
        Array.prototype.forEach = function(callback) {
            var arr = this,
                i = 0,
                length = arr.length;

            for (i = 0; i < length; i++) {
                callback(arr[i], i);
            }
        };
    }
    // polyfill for Function.bind
    if (!('bind' in Function.prototype)) {
        Function.prototype.bind = function(obj) {
            var fn = this;

            return function() {
                fn.apply(obj, arguments);
            };
        };
    }
    // polyfill for requestAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };

}.call(window));
