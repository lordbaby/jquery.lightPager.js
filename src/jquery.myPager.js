/**
 * 分页插件开发
 * @param  {[type]} $         [description]
 * @param  {[type]} window    [description]
 * @param  {[type]} document  [description]
 * @param  {[type]} undefined [description]
 * @return {[type]}           [description]
 */
;(function($,window,document,undefined){
	"use strict"

	var defaults={
		pageIndex:1,
		pageSize:10,
		itemCount:50,
		prevText:"上一页",
		nextText:"下一页",
		buildPageUrl:null,
		onPageChanged:null
	};

	function Pager($ele,options){
		this.$ele=$ele;
		this.options=options;
		this.init();
	}

	Pager.prototype={
		constructor:Pager,
		init:function(){
			this.renderHtml();
			this.bindEvent();
		},
		renderHtml:function(){
			var options=this.options;

			options.pageCount=Math.ceil(options.itemCount/options.pageSize);

			var pageIndex=options.pageIndex,
				total=options.pageCount,
				prevText=options.prevText,
				nextText=options.nextText,
				that=this;

			//生成html关键在于此
			//pageIndex : 当前页
			//pageCount : 总页数
			//
			/*
			var showPages=function(pageIndex,total){
				var html=[];
				html.push(pageIndex);
				//当前页码向前，向后各加3位数字
				for(var i=1;i<=3;i++){
					if(pageIndex-i>1){
						html.unshift(pageIndex-i);
					}
					if(pageIndex+i<total){
						html.push(pageIndex+i);
					}
				}
				//添加左侧省略页码
				if(pageIndex-4>1){
					html.unshift('...');
				}
				//添加上一页
				if(pageIndex>1){
					html.unshift('上一页1');
				}
				//生成右侧省略页码
				if(pageIndex+4<total){
					html.push('...');
				}
				//添加下一页
				if(pageIndex<total){
					html.push(''+total+'下一页');
				}
				return html.join('');
			}

			for(var i=1;i<=10;i++){
				console.log('当前页为 '+i+' : '+showPages(i,100));
			}

			 当前页为 1 : 1234...100下一页
			 当前页为 2 : 上一页12345...100下一页
			 当前页为 3 : 上一页123456...100下一页
			 当前页为 4 : 上一页1234567...100下一页
			 当前页为 5 : 上一页12345678...100下一页
			 当前页为 6 : 上一页1...3456789...100下一页
			 当前页为 7 : 上一页1...45678910...100下一页
			 当前页为 8 : 上一页1...567891011...100下一页
			 当前页为 9 : 上一页1...6789101112...100下一页
			 当前页为 10 : 上一页1...78910111213...100下一页
			*/


			var showPages=function(pageIndex,total){
				var html=[];
				html.push('<span class="curPage">'+pageIndex+'</span>');
				for(var i=1;i<=3;i++){
					if(pageIndex-i>1){
						html.unshift('<a page="'+(pageIndex-i)+'" href="'+that.bindPageUrl(pageIndex-i)+'">'+(pageIndex-i)+'</a>');
					}
					if(pageIndex+i<total){
						html.push('<a page="'+(pageIndex+i)+'" href="'+that.bindPageUrl(pageIndex+i)+'">'+(pageIndex+i)+'</a>');
					}
				}
				if(pageIndex-4>1){
					html.unshift('<span>...</span>');
				}
				if(pageIndex>1){
					html.unshift('<a page="1" href="'+that.bindPageUrl(1)+'">1</a>');
					html.unshift('<a page="'+(pageIndex-1)+'" href="'+that.bindPageUrl(pageIndex-i)+'" class="flip">'+prevText+'</a>');
				}
				if(pageIndex+4<total){
					html.push('<span>...</span>');
				}
				if(pageIndex<total){
					html.push('<a page="'+total+'" href="'+that.bindPageUrl(total)+'">'+total+'</a>');
					html.push('<a page="'+(pageIndex+1)+'" href="'+that.bindPageUrl(pageIndex+i)+'" class="flip" >'+nextText+'</a>');
				}

				if(total>1){
					html.push('第<input type="text" value="'+pageIndex+'"><button>跳转</button>')
				}

				return html.join('');
			}

			var pages= showPages(pageIndex,total);

			this.$ele.html(pages);



		},
		bindEvent:function(){
			var that=this;
			that.$ele.on('click','a',function(){
				that.options.pageIndex=parseInt($(this).attr('page'),10);
				that.renderHtml();
				that.options.pageOnChanged&&that.options.pageOnChanged(that.options.pageIndex);
			});
			that.$ele.on('click','button',function(){
				var val=that.$ele.find('input').val()||'1';
				val=parseInt(val,10);
				if(typeof val==='number'){
					val=val>that.options.pageCount?that.options.pageCount:val;
					that.options.pageIndex=val;
					that.renderHtml();
				}
			})
		},
		bindPageUrl:function(pageIndex){
			if($.isFunction(this.options.buildPageUrl)){
				return this.options.buildPageUrl(pageIndex);
			}
			return 'javascript:;';
		},
		getPageIndex:function(){
			return this.options.pageIndex;
		},
		setPageIndex:function(pageIndex){
			if(typeof pageIndex==='number'&&pageIndex>0){
				this.options.pageIndex=pageIndex;
				this.renderHtml();
			}
		},
		setItemCount:function(itemCount){
			if(itemCount>1){
				this.options.pageIndex=1;
				this.options.itemCount=itemCount;
				this.renderHtml();
			}
		}
	}

	$.fn.pager=function(options){
		options=$.extend(defaults, options||{});
		
		return new Pager($(this),options);
	}

})(jQuery,window,document);