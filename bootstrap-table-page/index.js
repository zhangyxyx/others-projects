//主页面的js
define(["backbone", "tpl!./view", './table'], function (Backbone, tpl, table) {
    return Backbone.View.extend({
        tableTemplate: _.template(tableTpl),
        initialize: function (options) {
            this.options = options;
            //**获取连接中页码的变量
            this.tableNum = options.tableNum || 1;
            this.title = this.getTitle(options);
        },
        events: {
            "click .patentsTable": 'getpatentsTable',//**设置返回列表页的时候记住到第几页
        },
        render: function () {
            var options = this.options;
            // 基本内容
            this.$el.html(tpl({
                states: state.get(),
                createTypes: createType.get()
            }));
            var $search = this.$('#search-form');
            // 是否指定状态查询
            if (options.state) {
                $search.find('[name=state]').val(options.state);
            }
            //**将获取的页码赋值给一个变量
            var tableNum = this.tableNum || 1;
            // 表格
            this.tableView = new table({
                options: this.options,
                tableNum: parseInt(tableNum)//**将string变成number格式
            });

            // 自定义搜索
            this.tableView.getQueryParams = function () {
                var data = $search.getData({
                    visibleOnly: false
                });
                if (options.source) {
                    data.source = options.source;
                }
                if (options.recommended) {
                    data.recommended = options.recommended;
                }
                return data;
            }
            this.$("#div_table").html(this.tableView.render().$el);
            return this
        },

        //**设置点击每个列表中的数据的时候，跳转的时候将当前是第几页放到连接中
        getpatentsTable: function (e) {
            var _this = this;
            var pageActive = this.$(".pagination").find(".active").text();
            var $e = $(e.currentTarget);
            var href = $e.attr("data-href");
            _this.$(".mark").html(pageActive);
            location.href = href + "&tableNum=" + pageActive
        },

        search: function () {
            this.tableView && this.tableView.refresh();
        },

    });
});
