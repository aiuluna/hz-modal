'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by hz on 18/2/1.
 */
var defaultModalParams = {
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    modalTitle: '提示'
};
/*======================================================
 ************   Modals   ************
 ======================================================*/
function transitionEnd($this, callback) {
    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
        i = void 0,
        j = void 0,
        dom = $this;

    function fireCallBack(e) {
        /*jshint validthis:true */
        if (e.target !== this) return;
        callback.call(this, e);
        for (i = 0; i < events.length; i++) {
            dom.removeEventListener(events[i], fireCallBack);
        }
    }

    if (callback) {
        for (i = 0; i < events.length; i++) {
            dom.addEventListener(events[i], fireCallBack);
        }
    }
    return this;
};
function _getParams(text, callbackOk, callbackCancel) {
    var params = {};
    if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object') {
        params = text;
    } else if (typeof text === 'string') {
        params.text = text;
    }
    params.isMaster = params.isMaster !== false;
    params.callbackOk = params.callbackOk || callbackOk;
    params.callbackCancel = params.callbackCancel || callbackCancel;
    params = Object.assign({}, defaultModalParams, params);
    return params;
}

var Modal = {
    modal: function modal(params) {
        params = params || {};
        var modalHTML = '';
        var buttonsHTML = '';
        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
            }
        }
        var loadingHTML = '';
        if (params.isLoading) {
            loadingHTML = '<i class="modalfont font-loading">&#xe61c;</i>';
        }

        var customClassName = params.customClassName ? params.customClassName : '';
        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
        var afterTextHTML = params.afterText ? params.afterText : '';
        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
        modalHTML = loadingHTML ? '<div>' + loadingHTML + '</div>' : '<div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div>';
        var modal = document.createElement('div');
        modal.className = 'modal ' + noButtons + ' ' + customClassName;
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        var buttons = Array.prototype.slice.call(modal.querySelectorAll('.modal-button'));
        buttons.forEach(function (el, index) {
            el.addEventListener('click', function (e) {
                if (params.buttons[index].close !== false) Modal.closeModal(modal);
                if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                if (params.onClick) params.onClick(modal, index);
            });
        });
        params.isMaster && modal.classList.add('J_hasMaster');
        Modal.openModal(modal);
        return modal;
    },
    openModal: function openModal(modal) {
        /*if(modal.classList.contains('popup')){
         modal.show();
         }else{
         /!* modal.css({
         marginTop: -Math.round(modal.height() / 2) + 'px'
         });*!/
         }*/
        if (modal.classList.contains('J_hasMaster')) {
            var div = document.createElement('div');
            div.className = 'modal-overlay modal-overlay-visible';
            document.body.appendChild(div);
        }
        modal.classList.remove('modal-out');
        modal.classList.add('modal-in');
        transitionEnd(modal, function (e) {
            /*  if (modal.hasClass('modal-out')) modal.trigger('closed');
             else modal.trigger('opened');*/
        });
        return modal;
    },
    closeModal: function closeModal(modal) {
        modal = modal || document.querySelector('.modal-in');
        if (typeof modal !== 'undefined' && modal.length === 0) {
            return;
        }
        modal.classList.contains('J_hasMaster') && document.querySelector('.modal-overlay').remove();
        modal.classList.remove('modal-in');
        modal.classList.add('modal-out');
        // modal.trigger('close');
        transitionEnd(modal, function (e) {
            /* if (modal.hasClass('modal-out')) modal.trigger('closed');
             else modal.trigger('opened');*/
            // modal.classList.contains('popup')? '' :modal.remove();
            modal.remove();
        });
        return true;
    }

};
/**
 * 弹出提示，不会自动消失，适合提交发布过程中的loading
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
Modal.tip = function (text) {
    return Modal.modal({
        text: text || ''
    });
};

/**
 * 模拟native的toast效果，会自动消失
 * @param  {[type]} text          [description]
 * @param  {[type]} autoHideSpeed [description]
 * @param  {[type]} callbackOk    [description]
 * @return {[type]}               [description]
 */
Modal.toast = function (text, autoHideSpeed, callbackOk) {
    if (typeof autoHideSpeed === 'function') {
        callbackOk = arguments[1];
        autoHideSpeed = undefined;
    }
    if (/^(error|warn|success):/g.test(text)) {
        text = text.replace(/^(error|warn|success):/g, function ($1, $2) {
            return '<i class="icon icon-' + $2 + '"></i>';
        });
    }
    var modal = Modal.modal({
        customClassName: 'ui-toast',
        text: text || ''
    });
    setTimeout(function () {
        Modal.closeModal(modal);
    }, autoHideSpeed || 3000);
};

/**
 * [alert description]
 * @param  {[type]} text       [description]
 * @param  {[type]} title      [description]
 * @param  {[type]} callbackOk [description]
 * @return {[type]}            [description]
 */
Modal.alert = function (text, callbackOk) {
    var params = _getParams(text, callbackOk);
    params.customClassName = 'ui-alert';
    // params.title = params.title || defaultModalParams.modalTitle;
    params.buttons = [{
        text: params.modalButtonOk,
        bold: true,
        onClick: params.callbackOk
    }];
    return Modal.modal(params);
};

/**
 * [confirm description]
 * @param  {[type]} text           [description]
 * @param  {[type]} title          [description]
 * @param  {[type]} callbackOk     [description]
 * @param  {[type]} callbackCancel [description]
 * @return {[type]}                [description]
 */
Modal.confirm = function (text, callbackOk, callbackCancel) {
    var params = _getParams(text, callbackOk, callbackCancel);
    params.customClassName = 'ui-confirm';
    // params.title = params.title || defaultModalParams.modalTitle;
    params.buttons = [{
        text: params.modalButtonCancel,
        onClick: params.callbackCancel
    }, {
        text: params.modalButtonOk,
        bold: true,
        onClick: params.callbackOk
    }];
    return Modal.modal(params);
};

/**
 * [prompt description]
 * @param  {[type]} text           [description]
 * @param  {[type]} title          [description]
 * @param  {[type]} callbackOk     [description]
 * @param  {[type]} callbackCancel [description]
 * @return {[type]}                [description]
 */
Modal.prompt = function (text, callbackOk, callbackCancel) {
    var params = _getParams(text, callbackOk, callbackCancel);
    params.title = params.title || defaultModalParams.modalTitle;
    params.customClassName = 'ui-prompt';
    params.buttons = [{
        text: params.modalButtonCancel
        // onClick: params.callbackCancel
    }, {
        text: params.modalButtonOk,
        bold: true
        //  onClick: params.callbackOk
    }];
    params.onClick = function (modal, index) {
        var input = modal.querySelector('.modal-text-input');
        var value = modal && modal.value;
        if (index === 0 && params.callbackCancel) params.callbackCancel(value);
        if (index === 1 && params.callbackOk) params.callbackOk(value);
    };
    return Modal.modal(params);
};

/**
 * [loading description]
 */
Modal.loading = function () {
    return Modal.modal({
        customClassName: 'ui-loading',
        isMaster: true,
        isLoading: true
    });
};
exports.default = Modal;