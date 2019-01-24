define(["backbone", './state', './create.type', 'bootstrap.table.extension'], function (Backbone, state, createType, Table) {
    return Table.extend({
        initialize: function (options) {
            this.options = options.options;
            this.tableNum = options.tableNum;//**设置获取当前页码的变量
            Table.prototype.initialize.call(this, this.options);
        },
        events: {
            "click a[op=setting]": "setting",
            "click a[op=recommend]": "recommend",
        },
        render: function () {
            var _this = this;
            // 创建table节点
            this.$table = $("<table>");
            this.$el.html(this.$table);
            function responseHandler(res) {
                $.each(res.rows, function (i, row) {
                    //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true  
                    row.checkStatus = $.inArray(row.id, this.selectionIds) != -1;
                });
                return res;
            };
            // 初始化表格
            this.$table.bootstrapTable({
                locale: 'zh-CN',
                pagination: true,
                // 默认表格数据排序字段
                sortName: "",
                sortOrder: "",
                idField: "id",//标志选项的id
                pageNumber: _this.tableNum,//**这是第几页
                pageSize: 10,
                pageList: [10, 50, 100],
                sidePagination: 'server',
                maintainSelected: true,
                ajax: $request,
                url: $request.api + "/patents/query?",
                queryParams: function (params) {
                    params["columns"] = "applyDate,name,publicDate,inventor,id,updateTime,type,ipcNumber,source,recommended,intentions,price,state,attentions,applyNumber,name,patentee,pageview,transactionType,createType,creator,topTime,createTime";
                    // 是否有附加参数
                    if ($.isFunction(_this.getQueryParams)) {
                        params = $.extend(params, _this.getQueryParams());
                    }
                    return params;
                },
                clickToSelect: true,
                responseHandler: responseHandler,
                columns: [{
                    field: 'checkStatus', checkbox: true,
                }, { field: 'id', visible: false },
                {
                    title: '序号',
                    formatter: function (value, row, index) {
                        return index + 1;
                    }
                }, {
                    field: 'name',
                    title: '名称',
                    sortable: true,
                    formatter: function (value, row) {
                        var html = "";
                        if (row.topTime) {
                            html += '<span style="font-size:smaller;color:#d9534f;">[置顶]</span> ';
                        }
                        //html += '<a style="cursor:pointer;color:#337ab7" title="编辑专利信息" class="patentsTable" href="#patents/form?dataid={0}&name={1}">{2}</a>'.format(row.id, encodeURIComponent(row.name), value);
                        //**设置一个class名字并且设置自定义属性赋值为每个详情的链接
                        html += '<span style="cursor:pointer;color:#337ab7" title="编辑专利信息" class="patentsTable" data-href="#patents/form?dataid={0}&name={1}">{2}</span>'.format(row.id, encodeURIComponent(row.name), value);
                        return html;
                    }
                }]
            });
            return this;
        },
        refresh: function (params) {
            this.$table.bootstrapTable("refresh", {
                query: params
            });
        },
    });
});