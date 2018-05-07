define(['./config/skin','./config/i18n'], function (skin,i18n) {
    'use strict';
    return {
        init:function(){
            skin.init();
            i18n.init();
        }
    }
});