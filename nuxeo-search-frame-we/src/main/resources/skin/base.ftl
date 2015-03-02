<html>
<head>
  <title>
     <@block name="title">
     WebEngine Project
     </@block>
  </title>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
  <link rel="shortcut icon" href="${skinPath}/image/favicon.gif" />
  <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
  <link rel="stylesheet" href="${skinPath}/css/site.css" type="text/css" media="screen" charset="utf-8">
  
  
  <@block name="stylesheets" />
  <@block name="header_scripts" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  body {
		overflow-x:hidden;
	  	height:100%;
		width:800px;
		margin:1em;
}
  
  </style

</head>

<body>
      <@block name="content">The Content</@block>
</body>
</html>
