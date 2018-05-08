define([], function () {
    'use strict';

    function init() {
        webix.skin.flat.barHeight = 32;
        webix.skin.flat.tabbarHeight = 36;
        webix.skin.flat.rowHeight = 28;
        webix.skin.flat.listItemHeight = 28;
        webix.skin.flat.inputHeight = 36;
        webix.skin.flat.layoutMargin.wide = 5;
        webix.skin.flat.layoutMargin.space = 5;
        webix.skin.flat.layoutPadding.space = 5;
        webix.skin.set('flat')

        // webix.editors.$popup = {
        //     date: {
        //         view: "popup",
        //         body: { view: "calendar", weekNumber: true ,width: 286}
        //     }
        // };
        // webix.editors.myeditor = webix.extend({
        //     render: function () {
        //         return webix.html.create("div", {
        //             "class": "webix_dt_editor"
        //         }, "<input type='email'>");
        //     }
        // }, webix.editors.text);
        webix.editors.myeditor = webix.extend({
            focus: function () {},
            popupType: "date",
            setValue: function (t) {
                this.wi = this.config.stringResult || t && "string" == typeof t,
                    webix.editors.popup.setValue.call(this, t)
            },
            getValue: function () {
                return this.getInputNode().getValue(this.wi ? webix.i18n.parseFormatStr : "") || ""
            },
            popupInit: function (t) {
                t.getChildViews()[0].attachEvent("onDateSelect", function (t) {
                    webix.callEvent("onEditEnd", [t])
                })
            }
        }, webix.editors.popup);
        webix.editors.combo = webix.extend({
            xi: function (t) {
                return this.config.popup ? this.config.popup.config.id : t ? e(t) : this.rt(t)
            },
            rt: function () {
                var t = webix.editors.combo;
                return t.st = t.st || this.xi(!0)
            },
            render: function () {
                var t = webix.html.create("div", {
                        "class": "webix_dt_editor"
                    }, "<input type='text' role='combobox' aria-label='" + i(this.config) + "'>"),
                    e = this.config.suggest = this.xi(this.config.suggest);
                return e && (webix.$$(e).linkInput(t.firstChild, !0), webix.UE(t.firstChild, "click", webix.bind(this.showPopup, this))), t
            },
            getPopup: function () {
                return webix.$$(this.config.suggest)
            },
            showPopup: function () {
                var t = this.getPopup(),
                    e = t.getList(),
                    i = this.getInputNode(),
                    s = this.getValue();
                t.show(i), i.setAttribute("aria-expanded", "true"),
                    s ? e.exists(s) && (e.select(s), e.showItem(s)) : (e.unselect(), e.showItem(e.getFirstId())), t.ae = i
            },
            afterRender: function () {
                this.showPopup()
            },
            setValue: function (t) {
                if (this.yi = t, this.config.suggest) {
                    var e = webix.$$(this.config.suggest),
                        i = this.config.collection || this.config.options;
                    i && e.getList().data.importData(i),
                        this.zi = this.getInputNode(this.node).value = e.getItemText(t)
                }
            },
            getValue: function () {
                var t = this.getInputNode().value;
                return this.config.suggest ? t == this.zi ? this.yi : webix.$$(this.config.suggest).getSuggestion() : t
            }
        }, webix.editors.text)
    }
    return {
        init: init
    }

});