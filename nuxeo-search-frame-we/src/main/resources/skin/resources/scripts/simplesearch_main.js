/*
*/ 
$(document).ready(function() {
	$(".js-document-selection-ajax").select2({
		  ajax: {
		    url: "http://localhost:8080/nuxeo/site/api/v1/query",
			placeholder: "Search for an Asset",
			allowClear: true,
		    dataType: 'json',
		    delay: 250,
		    data: function (params) {
		      return {
		        query: "select * from Document where ecm:mixinType != 'HiddenInNavigation' AND " +
				"ecm:isCheckedInVersion = 0 AND ecm:currentLifeCycleState != 'deleted' AND " +
				"ecm:mixinType != 'Folderish' AND ecm:primaryType='Picture' AND dc:title ilike '"+params.term+"%'", // search term
		        //page: params.page
		      };
		    },
		    processResults: function (data, page) {
				// parse the results into the format expected by Select2.
				// As Nuxeo results do not includes id but uid, need to format that.
				var array = data.entries;
				var i = 0;
			    while(i < array.length){
			        array[i]["id"] = array[i]['uid'];
			    i++;
			    }
		    	return { results: array };
		    },
		    cache: true,
            placeholder: "Select a value"
		  },
		  escapeMarkup: function (markup) { return markup; },
		  placeholder: "Search for an Asset",
		  allowClear: true,
		  minimumInputLength: 1,
		  templateResult: formatDocument, 
		  templateSelection: formatDocumentSelection,
		});
});

function initSelect2() {
	//$(".js-document-selection-ajax").html("<option>")
	
}

function formatDocument (document) {
    //return document.title;
	var markup = '<div class="clearfix">';
    if(document.uid){
    	markup+='<div class="col-sm-1"><img src="'+serverURL+'nxpicsfile/default/'+document.uid+'/Small:content/" alt="thumbnailPic" style="max-width: 100%"></div>' +
    		'<div class="col-sm-6">'+document.title + '</div>' ;
	}	
	markup+='</div>';
    return markup;
  }

function formatDocumentSelection (document) {
    //return document.title;
	var markup = '<div class="clearfix">';
    if(document.uid){
    	markup+='<div class="col-sm-1"><img src="'+serverURL+'nxpicsfile/default/'+document.uid+'/Small:content/" alt="thumbnailPic" style="max-width: 100%"></div>' +
    		'<div class="col-sm-1">'+document.title + '</div>' ;
	}	
	markup+='</div>';
    return markup;
  }

function renderQueryResults(error, data) {
	if (error) {
		throw error;
		}
	else {
		var documents=new Object();
		if(data) {
			documents=data;
		}
		else {
			documents.noQuery=true;
		}
		documents.serverURL=serverURL;
		documents.pictureUrlExtension='nxpicsfile/default/';
		documents.thumbnailSize='/Small:content/';
		documents.initialValue=initialValue;
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
	initialValue="";
	nxClient = new nuxeo.Client({timeout: 10000});
	nxClient.schema(["dublincore", "file"]);
	window.addEventListener( "message",
	          function (e) {
							initialValue=e.data.message;
							parentId=e.data.parentId;
							doQuery();
							initSelect2();
	          });
}

function postToParent(documentId){
	var messageToSend = {parentId:parentId, documentId:documentId}
	parent.postMessage(messageToSend, "*");
}




/* EOF */
