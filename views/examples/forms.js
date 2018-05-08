define(['./mock/api.js'], function (api) {
    'use strict';
    var layout = {
        type: 'space',
        cols: [{
            type: 'clean',
            rows: [{
                    view: "toolbar",
                    css: "highlighted_header header1",
                    paddingX: 5,
                    paddingY: 5,
                    height: 40,
                    cols: [{
                            "template": "<span class='webix_icon fa-male'></span>form controls",
                            "css": "sub_title2",
                            borderless: true
                        },
                        {
                            view: "button",
                            label: "Close",
                            width: 80
                        }
                    ]
                },
                {
                    view: "form",
                    id: "userForm",
                    elementsConfig: {
                        labelWidth: 140
                    },
                    elements: [{
                            view: "text",
                            label: "text",
                            name: "text",
                            placeholder: "input text in here..."
                        }, {
                            view: "text",
                            name: "text",
                            label: "text(suggest)",
                            value: "A",
                            suggest: api.lookup.SAMPLE
                        }, {
                            view: "text",
                            label: "password",
                            name: "password",
                            type: 'password',
                            placeholder: "password"
                        }, {
                            view: "text",
                            label: "email",
                            name: "email",
                            type: 'email',
                            placeholder: "email@example.com"
                        }, {
                            view: "text",
                            label: "url",
                            name: "url",
                            type: 'url',
                            placeholder: "http://example.com"
                        }, {
                            view: "search",
                            label:'search',
                            placeholder: "Search.."
                        }, {
                            view: "datepicker",
                            editable: true,
                            label: "datepicker",
                            name: "datepicker"
                        }, {
                            view: "daterangepicker",
                            name: "daterangepicker",
                            width: 500,
                            label: "daterangepicker",
                            value: {
                                start: new Date(),
                                end: webix.Date.add(new Date(), 1, "month")
                            }
                        }, {
                            view: "colorpicker",
                            label: "colorpicker",
                            name: "colorpicker",
                            value: "#ffaadd"
                        },
                        {
                            view: "select",
                            label: "select",
                            options: api.lookup.TF
                        }, {
                            view: "multiselect",
                            label: "multiselect",
                            options: api.lookup.SAMPLE,
                            value: "1,4"
                        }, {
                            view: "multiselect",
                            label: 'multiselect(multi)',
                            name:'multiselect',
                            value:'2,3',
                            suggest: {
                                view: "multisuggest",
                                data: api.lookup.SAMPLE
                            }
                        }, {
                            view: "multiselect",
                            label: 'multiselect(check)',
                            name: 'multiselect',
                            value:'1',
                            suggest: {
                                view: "checksuggest",
                                checkAll: true,
                                data: api.lookup.SAMPLE
                            }
                        }, {
                            view: "multiselect",
                            label: "multiselect(all)",
                            value: "1,4",
                            suggest:{
                                selectAll:true,
                                data: api.lookup.SAMPLE
                            }
                        },
                        {
                            view: "richselect",
                            label: "richselect",
                            options: api.lookup.TF
                        },
                        {
                            view: "combo",
                            label: "combo",
                            options: api.lookup.TF
                        }, {
                            view: "multicombo",
                            label: "multicombo",
                            value: "1,3",
                            options: api.lookup.SAMPLE
                        }, {
                            view: "multicombo",
                            label: "multicombo(all)",
                            value: "2,3",
                            suggest: {
                                selectAll:true,
                                data: api.lookup.SAMPLE
                            }
                        }, {
                            view: "radio",
                            label: "radio",
                            value: 1,
                            options: api.lookup.SAMPLE
                        }, {
                            view: "counter",
                            label: "counter",
                            step: 10,
                            value: 33,
                            min: 21,
                            max: 100
                        }, {
                            template: "Label Top",
                            type: "section"
                        }, {
                            view: "forminput",
                            name: "screens",
                            label: 'dbllist',
                            list: {
                                height: 200,
                                scroll: false
                            },
                            body: {
                                view: "dbllist",
                                list: {
                                    height: 150,
                                        scroll: true
                                },
                                labelLeft: "Defaults",
                                labelRight: "Selected",
                                data: api.lookup.SAMPLE,
                                value: '1'
                            }
                        } ,
                        {
                            margin: 10,
                            paddingX: 2,
                            borderless: true,
                            cols: [{},
                                {
                                    view: "button",
                                    label: "Reset",
                                    align: "right"
                                },
                                {
                                    view: "button",
                                    label: "Save",
                                    type: "form",
                                    align: "right"
                                }
                            ]
                        }

                    ]

                }
            ]
        }, {}]
    }
    return {
        $ui: layout
    }
});