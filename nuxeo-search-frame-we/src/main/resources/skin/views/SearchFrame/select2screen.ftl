<@extends src="base.ftl"> 
<@block name="stylesheets">
  <link href="${skinPath}/css/select2.css" rel="stylesheet" />
</@block> 

<@block name="header_scripts">
<script src="${skinPath}/scripts/jquery-2.1.1.js"></script>
<script src="${skinPath}/scripts/nuxeo.js"></script>
<script src="${skinPath}/scripts/simpledocumentselect2_main.js"></script>
<script src="${skinPath}/scripts/select2.js"></script>
</@block> 

<@block name="content">

<script type="text/javascript" charset="utf-8">
	var serverURL = "${Context.getBaseURL()}/nuxeo/";
</script>

<select class="js-document-selection-ajax" style="width: 50%">
</select>

</@block> </@extends>
