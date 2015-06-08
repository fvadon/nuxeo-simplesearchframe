<@extends src="base.ftl"> 
<@block name="stylesheets">
</@block> 

<@block name="header_scripts">
<script src="${skinPath}/scripts/jquery-2.1.1.js"></script>
<script src="${skinPath}/scripts/nuxeo.js"></script>
<script src="${skinPath}/scripts/jquery.mustache.js"></script>
<script src="${skinPath}/scripts/mustache.js"></script>
<script src="${skinPath}/scripts/simplesearch_main.js"></script>
</@block> 


<@block name="content">

<p><a href= "${Context.getBaseURL()}/nuxeo/site/searchframe/searchscreen">Search Screen</a></p>
<p><a href= "${Context.getBaseURL()}/nuxeo/site/searchframe/select2screen">Select 2 Screen</a></p>

</@block> </@extends>
