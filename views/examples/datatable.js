define([
    "models/products",
    './components/wSetStaAttribute.js'
], function (productsApi, wSetStaAttribute) {
    // 新增行默认数据
    var newRow = [];
    // 表头定义
    var columns = [{
        id: "id",
        header: "#",
        width: 50
    }, {
        id: "opt",
        header: "操作",
        width: 70,
        template: function (obj) {
            var btns = "<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"
            btns += "<span  style='cursor:pointer;' class='webix_icon fa-trash-o'></span>"
            return btns
        }
    }, {
        id: "code",
        header: "编码",
        sort: "string",
        minWidth: 80,
        fillspace: 1
    }, {
        id: "name",
        header: "名称",
        sort: "string",
        minWidth: 120,
        fillspace: 2,
        editor: "text"
    }, {
        id: "categoryName",
        header: "类型",
        sort: "string",
        minWidth: 120,
        fillspace: 2,
        template: "<div class='category#category#'>#categoryName#</div>"
    }, {
        id: "price",
        header: "单价",
        sort: "int",
        minWidth: 80,
        fillspace: 1,
        format: webix.i18n.priceFormat
    }, {
        id: "quantity",
        header: "数量",
        sort: "int",
        minWidth: 60,
        fillspace: 1
    }, {
        id: "statusName",
        header: "状态",
        minWidth: 75,
        sort: "string",
        minWidth: 70,
        fillspace: 1,
        template: "<span class='status status#status#'>#statusName#</span>"
    }];
    // 工具栏
    var toolbar = {
        height: 40,
        cols: [{
                view: 'button',
                type: 'iconButton',
                icon: 'plus',
                width: 120,
                label: '添加字段',
                click: function () {
                    this.$scope.ui(webix.copy(wSetStaAttribute.$ui)).show();
                    wSetStaAttribute.setValues([{
                        id: 'n_0',
                        name: '张三',
                        sex: 1,
                        age: 24
                    }, {
                        id: 'n_1',
                        name: '李四',
                        sex: 1,
                        age: 27
                    }])
                }
            }, {
                view: 'button',
                type: 'iconButton',
                icon: 'plus',
                width: 80,
                label: '新增',
                click: function () {
                    $$("datatable:datagrid").add(newRow, 0);
                }
            }, {
                view: "button",
                type: "iconButton",
                icon: "file-excel-o",
                width: 80,
                label: "导出",
                click: function () {
                    $$("datatable:datagrid").exportToExcel();
                }
            },
            {
                view: "button",
                type: "iconButton",
                icon: "refresh",
                width: 80,
                label: "刷新",
                click: function () {
                    var grid = $$("datatable:datagrid");
                    grid.clearAll();
                    grid.showProgress();
                    webix.delay(function () {
                        grid.parse(products.getAll);
                        grid.hideProgress();
                    }, null, null, 300);

                }
            },
            {},
            {
                view: "richselect",
                id: "order_filter",
                value: "all",
                maxWidth: 300,
                minWidth: 250,
                vertical: true,
                labelWidth: 110,
                options: [{
                        id: "all",
                        value: "All"
                    },
                    {
                        id: "1",
                        value: "Published"
                    },
                    {
                        id: "2",
                        value: "Not published"
                    },
                    {
                        id: "0",
                        value: "Deleted"
                    }
                ],
                label: "Filter products",
                on: {
                    onChange: function () {
                        var val = this.getValue();
                        if (val == "all")
                            $$("datatable:datagrid").filter("#status#", "");
                        else
                            $$("datatable:datagrid").filter("#status#", val);
                    }
                }
            }
        ]
    };

    // 翻页
    var pagation = {
        view: "toolbar",
        css: "highlighted_header header6",
        paddingX: 5,
        paddingY: 5,
        height: 40,
        cols: [{
                view: "pager",
                id: "datatable:pagation",
                template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                autosize: true,
                height: 35,
                group: 5
            }

        ]
    }

    // 列表
    var datagrid = {
        id: "datatable:datagrid",
        view: "datatable",
        // select: true,
        editable: true,
        editaction: "dblclick",
        columns: columns,
        pager: "datatable:pagation",
        "export": true,
        data: productsApi.getAll,
        onClick: {
            "fa-trash-o": function (e, id, node) {
                webix.confirm({
                    text: "您确定要删除码 ?",
                    ok: "确定",
                    cancel: "取消",
                    callback: function (res) {
                        if (res) {
                            var item = webix.$$("datatable:datagrid").getItem(id);
                            item.status = "0";
                            item.statusName = "Deleted";
                            webix.$$("datatable:datagrid").refresh(id);
                        }
                    }
                });
            }
        },
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        }
    };

    // 主结构
    var layout = {
        type: "space",
        rows: [
            toolbar,
            {
                rows: [
                    datagrid,
                    pagation
                ]
            }


        ]

    };

    return {
        $ui: layout
    };

});