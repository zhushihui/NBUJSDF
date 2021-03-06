<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/tags/emap.tld" prefix="e" %>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <!-- all.css 转测时开放（执行gulp buildapp 命令可以生成该文件）-->
    <!-- <link rel="stylesheet" href="./dest/all.css"/> -->

    <!-- commomlib include jquery.js jquery.nicescroll.js jquery.fileupload.js director.min.js hogan.min.js lodash.min.js globalize.js-->
    <script src="http://res.wisedu.com/fe_components/commonlib.js"></script>
    <!-- 此处可以放置第三方库-->
    <script src="http://res.wisedu.com/fe_components/appcore-min.js"></script>

    <!-- package.js 转测时开放（执行gulp buildapp 命令可以生成该文件）-->
    <!-- <script type="text/javascript" src="./dest/package.js"></script> -->
    
    <!-- 全局变量pageMeta-->
    <script type="text/javascript">
        var pageMeta = <e:page/>;
        var contextPath = "<%= request.getContextPath() %>";
    </script>
</head>

<body>
</body>

</html>
