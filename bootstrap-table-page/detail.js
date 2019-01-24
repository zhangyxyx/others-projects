define(['require', "backbone", "tpl!./view"], function(require, Backbone, tpl) {
	// 需要加载的form表单列表
	return Backbone.View.extend({
		initialize : function(options) {
			this.options = options;
			this.dataid = options.dataid;
			if (!options.dataid) {
				this.title = ["<a href='javascript:history.go(-1)'>专利管理</a>", "新增"];
			}
		},
		events : {
			"click #patent-back" : "back",
			"click #btn-submit" : "submit",
		},
		render : function(callback) {
            //略
		},
		submit : function(callback) {
			var _this = this;
			this.getData(function(data) {
				$request({
					type : "post",
					url : xxx,
					data : $.extend(data, {
						id : _this.dataid,
						recommended : _this.options.recommended
					}),
					loading : {
						show : true,
						message : '正在提交,请稍候...',
						area : _this.$el
					},
					success : function(result) {
						layer.msg('成功');
                        //history.go(-1);
                        //点击提交之后，给要跳转的链接添加上之钱存储的页码
						location.href=window.location.origin+window.location.pathname+"#patents?tableNum="+_this.options.tableNum	
					}
				});
			});
        },
        //点击返回之后，给要跳转的链接添加上之钱存储的页码
		back:function(){
			location.href=window.location.origin+window.location.pathname+"#patents?tableNum="+this.options.tableNum			    
		}
		
	});
});
