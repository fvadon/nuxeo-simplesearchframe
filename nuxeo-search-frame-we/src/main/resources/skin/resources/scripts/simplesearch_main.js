/*
*/ 


function renderQueryResults(error, data) {
	if (error) {
		throw error;
		}
	else {
		var documents=new Object();
		if(data) {
			console.log("not empty");
			documents=data;
		}
		else {
			documents.noQuery=true;
		}
		documents.serverURL=serverURL;
		documents.pictureUrlExtension='nxpicsfile/default/';
		documents.thumbnailSize='/Thumbnail:content/';
		documents.initialValue=initialValue;
		console.log(documents);
      	$.Mustache.load('./skin/searchframe/mustache/queryResultsTemplate.html').done(function(){
          var content = $.Mustache.render('query-results', documents);
      		 $('#results').html(content);
      		content = $.Mustache.render('previous-value', documents);
     		 $('#previousValue').html(content);
      		 })
      	}
}
	
// Being Called when the search button is clicked ==============================
function doQuery() {
	if(document.getElementById("searchField")){
		var searchString =  document.getElementById("searchField").value; 

	}
	else {
		var searchString = "";
	}
    //document.getElementById("search-terms").innerHTML = "You searched: ".concat(searchString);
	if(searchString!="") {
	    nxClient.operation("Document.Query").params({
			query: "select * from Document where ecm:mixinType != 'HiddenInNavigation' AND " +
					"ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted' AND " +
					"ecm:mixinType != 'Folderish' AND ecm:primaryType='Picture' AND dc:title ilike '"+ searchString+"%'"})
			.execute(renderQueryResults);		
	}
	else {
		renderQueryResults();
		}

}

function doInit() {
	nxClient = new nuxeo.Client({timeout: 10000});
	nxClient.schema(["dublincore", "file"]);
	window.addEventListener( "message",
	          function (e) {
							initialValue=e.data;
							doQuery();
							console.log(e.data);
	          });
}

function postToParent(documentId){
	parent.postMessage(documentId, "*");
	//initialValue="";
}




/* EOF */
