define([], function () {
    'use strict';
    var _alldata = [{
        id: 'n_0',
        name: '张三',
        sex: 1,
        age: 24
    }, {
        id: 'n_1',
        name: '李四',
        sex: 1,
        age: 27
    }, {
        id: 'n_2',
        name: '王五',
        sex: 1,
        age: 32
    }, {
        id: 'n_3',
        name: '赵六',
        sex: 0,
        age: 21
    }, {
        id: 'n_4',
        name: '钱七',
        sex: 0,
        age: 17
    }, {
        id: 'n_5',
        name: '周八',
        sex: 1,
        age: 41
    }];

    function _resource(url, params, options) {
        var opts = webix.extend({}, {
            methods: 'get',
            headers: {
                "Content-type": "application/json"
            }
        }, options)
        return webix.ajax().headers(opts.headers)[opts.methods](url, params)
    };

    return {
        resource: _resource,
        demo: {
            getAll: _alldata
        }
    };

});