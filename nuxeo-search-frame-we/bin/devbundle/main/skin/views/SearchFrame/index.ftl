<@extends src="base.ftl">
<@block name="header_scripts">
	<script src="${skinPath}/scripts/jquery-2.1.1.js"></script>
	<script src="${skinPath}/scripts/nuxeo.js"></script>
	<script src="${skinPath}/scripts/jquery.mustache.js"></script>
	<script src="${skinPath}/scripts/mustache.js"></script>
	<script src="${skinPath}/scripts/simplesearch_main.js"></script>

</@block>

<@block name="header">You signed in as ${Context.principal}</@block>

<@block name="content">

<div style="margin: 10px 10px 10px 10px">

<script type="text/javascript" charset="utf-8">
	doInit();
</script>

<input type="text" id="searchField">
<button onclick="doQuery()">Search</button>
<div id="search-terms"></div>
<div id="results"></div>


</div>

</@block>
</@extends>
