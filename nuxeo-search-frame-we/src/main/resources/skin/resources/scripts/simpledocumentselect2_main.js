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
		      };
		    },
		    processResults: function (data, page) {
				// parse the results into the format expected by Select2.
				// As Nuxeo results do not includes id but uid, need to format that.
				var array = data.entries;
				var i = 0;
			    while(i < array.length){
			        array[i]["id"] = array[i]['uid'];
			        array[i]["text"] = array[i]['title'];
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
		
	
		//Automatic styling
		$(".js-document-selection-ajax").on("change", function (e) {
			$(".select2-container--default .select2-selection--single").css("height",
					$(".select2-selection__rendered").outerHeight( true ));
		});
		setTimeout(adjustHeight, 0); // Have to wait for the component to be loaded
		
		// Registering event listening from parent to init the value.
		initialValue="";
		parentId="";
		window.addEventListener( "message",
		          function (e) {
								if(e.data.parentId){
									initialValue=e.data.message;
									parentId=e.data.parentId;
									initSelect2FromParent(initialValue);
								}
		          });
		
		//Automatic parent posting.
		$(".js-document-selection-ajax").on("change", postToParentFromSelect2);
		//$(".js-document-selection-ajax").on("select2:unselect", postToParentFromSelect2);

		
});

function adjustHeight() {	
	if($(".select2-selection__rendered").outerHeight( true ) > 10 ) {
		$(".select2-container--default .select2-selection--single").css("height",
				$(".select2-selection__rendered").outerHeight( true ));
	}
}


function initSelect2FromParent(initialValue) {
	// Create the DOM option that is pre-selected by default
    var option = new Option("Current Asset",initialValue , true, true);
    // Set it to the select
    $(".js-document-selection-ajax").html(option);
	$(".js-document-selection-ajax").trigger('change');
	setTimeout(adjustHeight, 50); 
}

function formatDocument (document) {
	var markup = '<div class="clearfix">';
    if(document.id){
    	markup+='<div class="col-sm-1"><img src="'+serverURL+'nxpicsfile/default/'+document.id+'/Thumbnail:content/" alt="thumbnailPic" style="max-width: 100%"></div>' +
    		'<div class="col-sm-6">'+document.text + '</div>' ;
	}	
	markup+='</div>';
    return markup;
  }

function formatDocumentSelection (document) {
    if(document.id){
    	var markup = '<div class="clearfix">';
    	markup+='<div class="col-sm-1"><img src="'+serverURL+'nxpicsfile/default/'+document.id+'/Thumbnail:content/" alt="thumbnailPic" style="max-width: 100%"></div>' +
    		'<div class="col-sm-1">'+document.text + '</div>' ;
    	markup+='</div>';
    	return markup;
	}
    else {
    	return document.text;
    }
  }

function postToParentFromSelect2(){
	var messageToSend = {parentId:parentId, documentId:$(".js-document-selection-ajax").val()}
	parent.postMessage(messageToSend, "*");
}




/* EOF */
