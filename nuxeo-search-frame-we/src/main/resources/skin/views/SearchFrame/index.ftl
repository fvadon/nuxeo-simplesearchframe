<@extends src="base.ftl">
<@block name="header_scripts">
<script src="${skinPath}/scripts/jquery-2.1.1.js"></script>
<script src="${skinPath}/scripts/nuxeo.js"></script>
<script src="${skinPath}/scripts/jquery.mustache.js"></script>
<script src="${skinPath}/scripts/mustache.js"></script>
<script src="${skinPath}/scripts/simplesearch_main.js"></script>

</@block>

<@block name="content">

<div>

	<script type="text/javascript" charset="utf-8">
	var serverURL="${Context.getBaseURL()}/nuxeo/";
	doInit();
	</script>

	<input type="text" id="searchField" onkeydown="doQuery()">
	<!--<button onclick="doQuery()">Search</button>-->
	<div id="results"></div>


</div>

</@block>
</@extends>
