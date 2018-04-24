define([
    "models/products"
], function (productsApi) {
    // 新增行默认数据
    var newRow = [];
    // 表头定义
    var columns = [{
        id: "id",
        header: "#",
        width: 50
    }, {
        id: "opt",
        header: "&nbsp;",
        width: 70,
        template: function (obj) {
            var btns = "<span  style=' cursor:pointer;' class='webix_icon fa-pencil'></span>"
            btns += "<span  style='cursor:pointer;' class='webix_icon fa-trash-o'></span>"
            return btns
        }
    }, {
        id: "code",
        header: "Code",
        sort: "string",
        minWidth: 80,
        fillspace: 1
    }, {
        id: "name",
        header: "Name",
        sort: "string",
        minWidth: 120,
        fillspace: 2,
        editor: "text"
    }, {
        id: "categoryName",
        header: "Category",
        sort: "string",
        minWidth: 120,
        fillspace: 2,
        template: "<div class='category#category#'>#categoryName#</div>"
    }, {
        id: "price",
        header: "Price",
        sort: "int",
        minWidth: 80,
        fillspace: 1,
        format: webix.i18n.priceFormat
    }, {
        id: "quantity",
        header: "Quantity",
        sort: "int",
        minWidth: 60,
        fillspace: 1
    }, {
        id: "statusName",
        header: "Status",
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
                width: 80,
                label: 'add',
                click: function () {
                    $$("datatable:datagrid").add(newRow, 0);
                }
            }, {
                view: "button",
                type: "iconButton",
                icon: "file-excel-o",
                width: 150,
                label: "Export To Excel",
                click: function () {
                    $$("datatable:datagrid").exportToExcel();
                }
            },
            {
                view: "button",
                type: "iconButton",
                icon: "refresh",
                width: 100,
                label: "Refresh",
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
                id: "pagerA",
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
        pager: "pagerA",
        "export": true,
        data: productsApi.getAll,
        onClick: {
            "fa-trash-o": function (e, id, node) {
                webix.confirm({
                    text: "The product will be deleted. <br/> Are you sure?",
                    ok: "Yes",
                    cancel: "Cancel",
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