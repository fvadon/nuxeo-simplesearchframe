/*
*/ 


function renderQueryResults(error, data) {
	if (error) {
		throw error;
		}
	else {
		console.log(data);
		var documents=data;
      	$.Mustache.load('./skin/searchframe/mustache/queryResultsTemplate.html').done(function(){
          var content = $.Mustache.render('query-results', documents);
      		 $('#results').html(content);
      		 })
      	}
}
	
// Being Called when the search button is clicked ==============================
function doQuery() {
	var searchString =  document.getElementById("searchField").value; 
    document.getElementById("search-terms").innerHTML = "You searched: ".concat(searchString);

    nxClient.operation("Document.Query").params({
		query: "select * from Document where ecm:mixinType != 'HiddenInNavigation' AND " +
				"ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted' AND " +
				"ecm:mixinType != 'Folderish' AND ecm:fulltext = '"+ searchString+"'"})
		.execute(renderQueryResults);
}

function doInit() {
	nxClient = new nuxeo.Client({timeout: 10000});
	nxClient.schema(["dublincore", "file"]);	
}




/* EOF */
