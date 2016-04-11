# jquery.lightPager.js

## 简介

1. 轻量级分页插件
2. 支持翻页按钮文字自定义
3. 支持页码改变后的回调函数
4. 支持页码链接

## 使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>pager</title>
    <script type="text/javascript" src="../jquery-1.10.0.js"></script>
    <script type="text/javascript" src="jquery.myPager.js"></script>
    <style type="text/css">
        .pager{
            display: inline-block; 
            font: 12 px/21px "宋体"; 
            margin-top: 20px;
        }
        .pager a, .pager .flip, .pager .curPage{
            border: 1px solid #e3e3e3; 
            display: inline-block; 
            height: 22px; 
            line-height: 22px;
            text-align: center;
        }
        .pager a{
            background: none repeat scroll 0 0 #fff;
            color: #010101;
            text-decoration: none;
            width: 26px; 
        }
         .pager a:hover { 
            background: none repeat scroll 0 0 #f1f1f1; 
         }
         .pager .noPage { color: #a4a4a4; }
         .pager .curPage { background: none repeat scroll 0 0 #49abde; color: #ffffff; width: 26px; }
         .pager .flip { width: 56px; }
         .pager input {
            width: 20px;
         }
    </style>
</head>
<body>

    <div class="pager"></div>

    <div>
        <button id="getPageIndex">
            获取索引页
        </button>
        <input id="itemCount" type="text" value="200">
        <button id="setItemCount">
            设置显示项的总数量
        </button>
    </div>
    <script type="text/javascript">
        $(function(){
          var pager=$('div.pager').pager({
                pageIndex:10,
                itemCount:100,
                pageSize:2,
                prevText:'Prev',
                nextText:'Next',
                buildPageUrl:null,
                onPageChanged:null
            });

            $('button').click(function(event) {
                /* Act on the event */
                var id=$(this).attr('id');
                if(id==='getPageIndex'){
                    alert(pager.getPageIndex());
                }
                if(id==='setItemCount'){
                    pager.setItemCount($('#itemCount').val())
                }
            });

        })

    </script>
</body>
</html>
```

## Options

|参数|类型|默认值|描述|
|----|---|-----|----|
|pageIndex|number|1|当前页码，1表示第一页|
|pageSize|number|10|每页显示数量|
|itemCount|number|50|显示项的总数量|
|prevText|string|"上一页"|上一页按钮显示的文字|
|nextText|string|"下一页"|下一页按钮显示的文字|
|buildPageUrl|function|null|构造页码按钮链接href的方法,包含一个pageIndex参数，不传则返回"javascript:;"|
|onPageChanged|function|null|页码修改后的回调函数，包含一个pageIndex参数|

## Method

|方法|参数|默认值|描述|
|----|---|-----|----|
|getPageIndex|null|null|获取当前页码|
|setPageIndex|number|null|设置当前页码|