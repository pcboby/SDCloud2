define([
], function() {
    'use strict';
    function init(){
        webix.skin.flat.barHeight = 32;
        webix.skin.flat.tabbarHeight = 36;
        webix.skin.flat.rowHeight = 28;
        webix.skin.flat.listItemHeight = 28;
        webix.skin.flat.inputHeight = 36;
        webix.skin.flat.layoutMargin.wide = 5;
        webix.skin.flat.layoutMargin.space = 5;
        webix.skin.flat.layoutPadding.space = 5;
        webix.skin.set('flat')
    }
    return {
        init:init
    }
    
});