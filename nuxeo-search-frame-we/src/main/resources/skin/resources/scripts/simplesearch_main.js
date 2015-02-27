/*
*/ 


function renderQueryResults(error, data) {
	if (error) {
		throw error;
		}
	else {
		var documents=data;
		documents.serverURL=serverURL;
		documents.pictureUrlExtension='nxpicsfile/default/';
		documents.thumbnailSize='/Thumbnail:content/';
		console.log(documents);
      	$.Mustache.load('./skin/searchframe/mustache/queryResultsTemplate.html').done(function(){
          var content = $.Mustache.render('query-results', documents);
      		 $('#results').html(content);
      		 })
      	}
}
	
// Being Called when the search button is clicked ==============================
function doQuery() {
	var searchString =  document.getElementById("searchField").value; 
    //document.getElementById("search-terms").innerHTML = "You searched: ".concat(searchString);
	if(searchString!="") {
	    nxClient.operation("Document.Query").params({
			query: "select * from Document where ecm:mixinType != 'HiddenInNavigation' AND " +
					"ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted' AND " +
					"ecm:mixinType != 'Folderish' AND ecm:primaryType='Picture' AND dc:title ilike '"+ searchString+"%'"})
			.execute(renderQueryResults);		
	}
	else {
		$('#results').html("");
		}

}

function doInit() {
	nxClient = new nuxeo.Client({timeout: 10000});
	nxClient.schema(["dublincore", "file"]);
	//console.log(parent.document.parent("div"));
	/*window.addEventListener( "message",
	          function (e) {
	                console.log(e.data);
	          });*/
}

function postToParent(){
	console.log("postFromEnfant");
	parent.postMessage('hello', "*");
}




/* EOF */
