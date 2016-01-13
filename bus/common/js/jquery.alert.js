;(function($){
    var _tipboxTempDiv = document.createElement('div');
    var tipboxStack = [];

    var config = {
        tipboxButtonOk: '确定',
        tipboxButtonCancel: '取消',
        tipboxTitle: '提示'
    };

    var offsetTop = function(element) {
        if (element.length > 0) {
            return ($(window).height() - element[0].offsetHeight) / 2 + $(document.body).scrollTop();
        }
        else return null;
    }

    var maskHeight = function() {
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();

        return Math.max(documentHeight, windowHeight);
    }

    var tipboxStackClearQueue = function () {
        if (tipboxStack.length > 0) {
            (tipboxStack.shift())();
        }
    };

    var tipbox = function(params) {
        params = params || {};
        var buttonsHTML = '';

        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<span class="tipbox-button' + (params.buttons[i].bold ? ' tipbox-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
            }
        }

        var titleHTML = params.title ? '<div class="tipbox-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="tipbox-text">' + params.text + '</div>' : '';
        var tipboxHTML = '<div class="tipbox ' + (params.cssClass || '') + '"><div class="tipbox-inner">' + (titleHTML + textHTML) + '</div><div class="tipbox-buttons">' + buttonsHTML + '</div></div>';

        _tipboxTempDiv.innerHTML = tipboxHTML;

        var tipbox = $(_tipboxTempDiv).children();

        $('body').append(tipbox[0]);

        tipbox.find('.tipbox-button').each(function (index, el) {
            $(el).on('click', function (e) {
                if (params.buttons[index].close !== false)
                    hideTipbox(tipbox);

                if (params.buttons[index].onClick)
                    params.buttons[index].onClick(tipbox, e);

                if (params.onClick)
                    params.onClick(tipbox, index);
            });
        });

        showTipbox(tipbox);

        return tipbox[0];
    };


    var showTipbox = function(tipbox) {
        tipbox = $(tipbox);
        var isTipbox = tipbox.hasClass('tipbox');

        if ($('.tipbox.tipbox-in:not(.tipbox-out)').length && tipboxStack && isTipbox) {
            tipboxStack.push(function () {
                showTipbox(tipbox);
            });
            return;
        }

        if (true === tipbox.data('tipbox-shown')) {
            return;
        }

        tipbox.data('tipbox-shown', true);
        tipbox.one('close', function() {
            tipbox.removeAttr('data-tipbox-shown');
        });

        if (isTipbox) {
            tipbox.show();
            //tipbox.css({marginTop:Math.round(offsetTop(tipbox)) + 'px' });
        }

        if ($('.tipbox-overlay').length === 0) {
            //$('body').append('<div class="tipbox-overlay" style="height:'+maskHeight()+'px"></div>');
            $('body').append('<div class="tipbox-overlay" ></div>');
        }

        var overlay = $('.tipbox-overlay');
        overlay.addClass('tipbox-overlay-visible');

        tipbox.trigger('open');

        tipbox.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
            if (tipbox.hasClass('tipbox-out')) tipbox.trigger('closed');
            else tipbox.trigger('opened');
        });

        tipbox.removeClass('tipbox-out').addClass('tipbox-in');

        return true;
    };


    var hideTipbox = function(tipbox) {
        tipbox = $(tipbox || '.tipbox-in');
        if (typeof tipbox !== 'undefined' && tipbox.length === 0) {
            return;
        }
        var isTipbox = tipbox.hasClass('tipbox');

        var overlay = $('.tipbox-overlay');
        overlay.removeClass('tipbox-overlay-visible');

        tipbox.trigger('close');

        tipbox.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
            if (tipbox.hasClass('tipbox-out')) tipbox.trigger('closed');
            else tipbox.trigger('opened');

            tipbox.remove();
        });

        tipbox.removeClass('tipbox-in').addClass('tipbox-out');

        if (isTipbox && tipboxStack) {
            tipboxStackClearQueue();
        }


        return true;
    };

    $.alert = function(text, title, callbackOk) {
        if (typeof title === 'function') {
            callbackOk = arguments[1];
            title = undefined;
        }

        return tipbox({
            title: title || config.tipboxTitle,
            text: text || '',
            buttons: [{text: config.tipboxButtonOk, bold: true, onClick: callbackOk}]
        });
    };

    $.confirm = function (text, title, callbackOk, callbackCancel) {
        if (typeof title === 'function') {
            callbackCancel = arguments[2];
            callbackOk = arguments[1];
            title = undefined;
        }

        return tipbox({
            title: title || config.tipboxTitle,
            text: text || '',
            buttons: [
                {text: config.tipboxButtonCancel, onClick: callbackCancel},
                {text: config.tipboxButtonOk, bold: true, onClick: callbackOk}
            ]
        });
    };
})(jQuery);