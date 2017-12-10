<%@ page language="java" errorPage="" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/common/taglibs.jsp"%>
<link rel="stylesheet" type="text/css" href="${ctx}/mobile/<spring:eval expression="@configProperties['mobile.web.vsersion']"/>/css/style.css?v=1.0" />
<link rel="stylesheet" type="text/css" href="${ctx}/mobile/<spring:eval expression="@configProperties['mobile.web.vsersion']"/>/css/map_mobile.css?v=1.0" />
<script type="text/javascript" src="${ctx}/js/jquery/jquery-1.11.1.min.js"></script>
<script type='text/javascript' src='https://www.google.com/jsapi'></script>
<script type="text/javascript" src="${ctx}/js/commons.js?v=1.0"></script>
<script type="text/javascript" src="${ctx}/mobile/<spring:eval expression="@configProperties['mobile.web.vsersion']"/>/js/commons.js?v=1.0"></script>
<script type="text/javascript" src="${ctx}/js/plugin/moment.js"></script>
<script type="text/javascript" src="${ctx}/js/plugin/moment-timezone.js"></script>