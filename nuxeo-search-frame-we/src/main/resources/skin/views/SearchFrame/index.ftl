<@extends src="base.ftl"> <@block name="header_scripts">
<script src="${skinPath}/scripts/jquery-2.1.1.js"></script>
<script src="${skinPath}/scripts/nuxeo.js"></script>
<script src="${skinPath}/scripts/jquery.mustache.js"></script>
<script src="${skinPath}/scripts/mustache.js"></script>
<script src="${skinPath}/scripts/simplesearch_main.js"></script>
<script src="${skinPath}/scripts/select2.js"></script>
</@block> <@block name="content">

<script type="text/javascript" charset="utf-8">
	var serverURL = "${Context.getBaseURL()}/nuxeo/";
	doInit();
</script>
<form class="pure-form">

	<div id="previousValue" class="pure-g"></div>
	<div class="pure-g" id="searchfieldDiv">
		<div class="pure-u-1">
			<input type="text" id="searchField" onkeydown="doQuery()"
				placeholder="Start Typing to look for an Asset" size="40">
		</div>
	</div>
	<div id="results" class="pure-g"></div>
	<div id="NoAsset" class="pure-g">
		<div class="pure-u-6-24">
			<div class="pure-g">
				<div class="pure-u-1 search-div-element">
					<label for="NoAsset" class="radio"> <input type="radio"
						name="asset" id="NoAsset" value="" onClick="postToParent('')">No
						Asset
					</label>
				</div>
			</div>
		</div>
	</div>
</form>

<select class="js-document-selection-ajax" style="width: 50%">
  <option value="2ca27cda-b832-4148-a354-168fd6a2d855" selected="selected">CurrentAsset</option>
</select>



</@block> </@extends>
