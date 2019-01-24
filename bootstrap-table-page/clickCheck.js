define(["backbone", './state', 'bootstrap.table.extension'], function(Backbone, state, Table) {
	return Table.extend({
		initialize : function(options) {
			this.options = options.options;
			this.tableNum=options.tableNum;
			this.selections=[];//**放置选中数据数组
			this.selectionIds=[];//**放置选中数据id的数组
			Table.prototype.initialize.call(this, this.options);
		},
		events : {
		},
		render : function() {
			var _this = this;
			// 创建table节点
			this.$table = $("<table>");
			this.$el.html(this.$table);
			//**
			function responseHandler(res) {
			    	$.each(res.rows, function (i, row) {  
			    	      //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true  
			              row.checkStatus = $.inArray(row.id, this.selectionIds) != -1;  
			          });  
			          return res;  
			};
			// 初始化表格
			this.$table.bootstrapTable({
				locale : 'zh-CN',
				pagination : true,
				// 默认表格数据排序字段
				sortName : "",
				sortOrder : "",
				idField:"id",//标志选项的id
				pageNumber : _this.tableNum,//**这是第几页
				pageSize : 10,
				pageList: [10, 50, 100],
				sidePagination : 'server',
				maintainSelected:true,
				ajax : $request,
				url :  xxx,
				queryParams : function(params) {
					//params["columns"] = "name,buyPerson,tel,price,createTime,state";
					// 是否有附加参数
					if ($.isFunction(_this.getQueryParams)) {
						params = $.extend(params, _this.getQueryParams());
					}
					return params;
				},
				clickToSelect : true,
				responseHandler : responseHandler,
				columns : [{
				    field: 'checkStatus',checkbox: true, 
				},{field: 'id',visible:false}, 
				{
					title : '序号',
					formatter : function(value, row, index) {
						return index + 1;
					}
				}, {
					field : 'name',
					title : '案例名称',
					sortable : true,
					formatter : function(value, row) {
						var html = "";
						if (row.topTime) {
							html += '<span style="font-size:smaller;color:#d9534f;">[置顶]</span> ';
						}
						return html+value;
					}
				}]
			});
			//**通过全部选中数据进行元素获取
			this.showCheck();
		    //**获取到全部选中的数据
			this.clickget()
			return this;
		},
		refresh : function(params) {
			this.$table.bootstrapTable("refresh", {
				query : params
			});
		},
		   clickget:function(){
		       var mark;
		       var _this=this;
		       var union = function(array,ids){  
			     $.each(ids, function (i, id) {  
			            if($.inArray(id,array)==-1){  
			                array[array.length] = id;  
			            }  
			     });  
			     return array;  
		       };
		       //取消选中事件操作数组  
		       var difference = function(array,ids){  
			   $.each(ids, function (i, id) {  
			                 var index = $.inArray(id,array);  
			                 mark=index;
			                 if(index!=-1){  
			                     array.splice(index, 1);  
			                 }  
			             });  
			    return array;  
		       };
		       var unions = function(arrays,rowa){  
			     $.each(rowa, function (i, row) {  
			            if($.inArray(row,arrays)==-1){  
			                arrays[arrays.length] = row;  
			            }  
			     });  
			     return arrays;  
		       };
		       var differences = function(arrays,rowa){  
			   $.each(rowa, function (i, row) {  
			                 
			                 if(mark!=-1){  
			                     arrays.splice(mark, 1);  
			                 }  
			             });
			 
			    return arrays;  
		       };
		       //绑定选中事件、取消事件、全部选中、全部取消  
		       this.$table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
			   	var _ = {"union":union,"difference":difference}; 
			   	var aa= {"unions":unions,"differences":differences};
		                var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {  
		                        return row.id;  
		                }); 
		                var rowa= $.map(!$.isArray(rows) ? [rows] : rows, function (row) {  
		                        return row
		                }); 
		                func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
		                funcs = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'unions' : 'differences';
		                _this.selectionIds = _[func](_this.selectionIds, ids);  
		                _this.selection = aa[funcs](_this.selections, rowa);  
		        })  
		   },
		   showCheck:function(){//当分页点击的时候显示之前的选择
			    var _this=this;
			    this.$(".bootstrap-table").on('post-body.bs.table', function () {
				for(var i=0;i<_this.selectionIds.length;i++){
				    _this.$("input[value="+_this.selectionIds[i]+"]").attr("checked",true);
				}
			    });
			},
		// 获取选中的行
		getSelections : function() {
			return this.$table.bootstrapTable("getSelections");
		},
	
		
	});
});
