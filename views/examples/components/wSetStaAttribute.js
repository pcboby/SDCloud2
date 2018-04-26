define([
    './cSetAttribute.js',
    './cSetWebsite.js'
], function (cSetAttribute, cSetWebsite) {
    'use strict';
    var componentId = 'wSetStaAttribute';

    var btns = {
        type:'space',
        cols: [{},
        {
            view: 'button',
            label: '保存模板'
        }, {
            view: 'button',
            type: 'form',
            label: '重置'
        },
        {
            view: 'button',
            type: 'form',
            label: '取消',
            click:function(){
                $$(componentId).close();
            }
        },
        {}
        ]
    }
    var layout = {
        id: componentId,
        view: 'window',
        width: 960,
        height: 480,
        modal: true,
        move: true,
        position:'center',
        head: {
            view: "toolbar",
            margin: -4,
            cols: [{
                    view: "label",
                    label: "This window can be closed"
                },
                {
                    view: "icon",
                    icon: "question-circle",
                    click: function () {
                        $$(componentId).config.fullscreen = !$$(componentId).config.fullscreen;
                        $$(componentId).resize();
                    }
                },
                {
                    view: "icon",
                    icon: "times-circle",
                    click: function () {
                        $$(componentId).close();
                    }
                }
            ]
        },
        body: {
            padding:10,
            rows: [{
                    view: "tabbar",
                    multiview: true,
                    optionWidth: 130,
                    options: [{
                            id: "cSetAttribute",
                            value: "设置属性"
                        },
                        {
                            id: "cSetWebsite",
                            value: "设置网站"
                        }
                    ]
                },
                {
                    cells: [
                        cSetAttribute.$ui, cSetWebsite.$ui
                    ]
                },
                btns
            ]
        }
    };

    return {
        $ui: layout,
        setValues: function (d){
            cSetAttribute.setValues(d);
        }
    }

});