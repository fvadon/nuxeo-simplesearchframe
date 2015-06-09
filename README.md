# nuxeo-search-frame
===


This plugin uses webengine pages to create content pickers that can be iframed into external system like portals. (Drupal for example:
[https://github.com/fvadon/nuxeo-drupal](https://github.com/fvadon/nuxeo-drupal))

The communication between the iframe window and the parent external system is done trough post messages (both ways).

2 content pickers are available:

- select2: uses a standard select2.js component (Recommended).
- search screen: dynamic js page that display search result using radio buttons to select a result.

If the server is on localhost, the content pickers are available at:

- [http://localhost:8080/nuxeo/site/searchframe/select2screen](http://localhost:8080/nuxeo/site/searchframe/select2screen)
- [http://localhost:8080/nuxeo/site/searchframe/searchscreen](http://localhost:8080/nuxeo/site/searchframe/searchscreen)

The parent can initialise the content picker with a current selected document id by posting a message once the iframe is loaded, the message must contain the parent ID so that the iframe will send it back enabling to use several content picker iframes in the same window. The following extract gives a JS example:

		var nuxeoSearchFrame = document.getElementById("IframeID");
		var messageToSend = {parentId:"IframeID", message:"NuxeoDocumentID"};
		  nuxeoSearchFrame.onload = function() {
		  nuxeoSearchFrame.contentWindow.postMessage(messageToSend,"*");
		}


Use mvn clean install to build. A marketplace package is generated.



## License
(C) Copyright 2015 Nuxeo SA (http://nuxeo.com/) and others.

All rights reserved. This program and the accompanying materials
are made available under the terms of the GNU Lesser General Public License
(LGPL) version 2.1 which accompanies this distribution, and is available at
http://www.gnu.org/licenses/lgpl-2.1.html

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

Contributors:
Frederic Vadon 

## About Nuxeo

Nuxeo provides a modular, extensible Java-based [open source software platform for enterprise content management](http://www.nuxeo.com) and packaged applications for Document Management, Digital Asset Management and Case Management. Designed by developers for developers, the Nuxeo platform offers a modern architecture, a powerful plug-in model and extensive packaging capabilities for building content applications.
