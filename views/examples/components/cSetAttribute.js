define([
    '../mock/api.js'
], function (api) {
    'use strict';
    var componetId = 'cSetAttribute';
    var toolbar = {
        view: 'form',
        borderless: true,
        padding: 5,
        elementsConfig: {
            labelWidth: 80
        },
        elements: [{
            cols: [{
                id:componetId+':keyCode',
                view: 'text',
                label: '关键字：',
                width: 248
            }, {
                view: 'button',
                label: '查询',
                width: 64,
                click:function(){
                    $$(componetId + ':defaultTable').filter('#name#', $$(componetId + ':keyCode').getValue());
                }
            }, {
                view: 'button',
                label: '重置',
                type: 'form',
                width: 64,
                click:function(){
                    $$(componetId + ':keyCode').setValue('');
                    $$(componetId + ':defaultTable').filter('#name#', '');
                }
            }, {}]
        }]
    };
    var columns = [{
            id: 'chk',
            width: 40,
            header: {
                content: "masterCheckbox"
            },
            template: "{common.checkbox()}",
            checkValue: 1,
            uncheckValue: 0
        },
        {
            id: 'name',
            header: 'name',
            fillspace:true
        }
    ];

    var defaultTable = {
        id: componetId + ':defaultTable',
        view: 'datatable',
        columns: webix.copy(columns),
        data: [],
        pager: componetId + ":pagation",
        on: {
            onCheck: defaultTableCheck
        }
    };

    var selectedTable = {
        id: componetId + ':selectedTable',
        view: 'datatable',
        columns: webix.copy(columns),
        data: [],
        on: {
            onCheck: selectedTableCheck
        }
    };

    var pagation = {
        view: "toolbar",
        css: "highlighted_header header6",
        paddingX: 5,
        paddingY: 5,
        height: 40,
        cols: [{
                view: "pager",
                id: componetId + ":pagation",
                template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                autosize: true,
                height: 35,
                group: 5
            }

        ]
    };
    var layout = {
        id: componetId,
        rows: [
            toolbar,
            {
                cols: [{
                        rows: [
                            defaultTable,
                            pagation
                        ]
                    }, {
                        width: 12
                    },
                    {
                        rows: [
                            selectedTable
                        ]
                    }
                ]
            }
        ]
    }

    function defaultTableCheck(rowId, columnName, state) {
        var dt = $$(componetId + ':defaultTable');
        var st = $$(componetId + ':selectedTable');
        var selectRow = dt.getItem(rowId);
        if (state === 1) {
            if (!st.getItem(rowId)) {
                st.add(selectRow);
            }
        } else {
            st.remove(rowId);
        }
    };

    function selectedTableCheck(rowId, columnName, state) {
        var dt = $$(componetId + ':defaultTable');
        var st = $$(componetId + ':selectedTable');
        var selectRow = dt.getItem(rowId);

        if (!state) {
            setTimeout(function () {
                st.remove(rowId);
                if (selectRow) {
                    selectRow.chk = 0;
                    dt.refresh();
                }
            }, 1);
        }
    };
    function setValues(datas){
        var dt = $$(componetId + ':defaultTable');
        var st = $$(componetId + ':selectedTable');
        // datas.forEach(function (d) {
        //     st.add(d);
        // })
        var dt_data = webix.copy(api.demo.getAll);

        dt_data.forEach(function(d){
            for(var i = 0;i<datas.length;i++){
                datas[i].chk = 1;
                if(datas[i].id === d.id){
                    d.chk = 1;
                    continue;
                }
            }
        });
        console.log('$$$$$',dt_data);

        dt.parse(dt_data);
        // dt.refresh();

        st.parse(datas);
        // st.refresh();
    }
    return {
        $ui: layout,
        setValues: setValues
    }
});