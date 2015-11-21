(function() {

	// Base template
	var base_tpl =
			"<!doctype html>\n" +
			"<html>\n\t" +
      "<head>\n\t\t" +
      "<meta charset=\"utf-8\">\n\t\t" +
      "<title>Test</title>\n\n\t\t\n\t" +
      "</head>\n\t" +
      "<body>\n\t\n\t" +
      "</body>\n" +
      "</html>";

	var prepareSource = function() {
		var html = html_editor.getValue(),
				css = css_editor.getValue(),
				app = app_editor.getValue(),
				controller = controller_editor.getValue(),
				src = '';

		// HTML
		src = base_tpl.replace('</body>', html + '</body>');

		// CSS
		css = '<style>' + css + '</style>';
		src = src.replace('</head>', css + '</head>');

		// Javascript

		app = '<script>' + app + '<\/script>';

		src = src.replace('</body>', app + '</body>');

		// controller
		controller = '<script>' + controller + '<\/script>';
		src = src.replace('</body>', controller + '</body>');

		return src;
	};

	var render = function() {
		var source = prepareSource();

		var iframe = document.querySelector('#output iframe'),
				iframe_doc = iframe.contentDocument;

		iframe_doc.open();
		iframe_doc.write(source);
		iframe_doc.close();
	};


	// EDITORS

	// CM OPTIONS
	var cm_opt = {
		mode: 'text/html',
		gutter: true,
		lineNumbers: true,
	};

	// HTML EDITOR
	var html_box = document.querySelector('#html textarea');
	var html_editor = CodeMirror.fromTextArea(html_box, cm_opt);

  html_editor.on('change', function (inst, changes) {
    render();
  });

	// CSS EDITOR
	cm_opt.mode = 'css';
	var css_box = document.querySelector('#css textarea');
	var css_editor = CodeMirror.fromTextArea(css_box, cm_opt);

  css_editor.on('change', function (inst, changes) {
    render();
  });

	// APP EDITOR
	cm_opt.mode = 'app';
	var app_box = document.querySelector('#app textarea');
	var app_editor = CodeMirror.fromTextArea(app_box, cm_opt);

  app_editor.on('change', function (inst, changes) {
    render();
  });

	// CONTROLLER EDITOR
	cm_opt.mode = 'controller';
	var controller_box = document.querySelector('#controller textarea');
	var controller_editor = CodeMirror.fromTextArea(controller_box, cm_opt);

	controller_editor.on('change', function (inst, changes) {
		render();
	});

	// SETTING CODE EDITORS INITIAL CONTENT

		app_editor.setValue(`var myApp = angular.module('myApp',[]);
			myApp.controller('myCtrl',function($scope){
			  $scope.name = 'Matt';

			   $scope.$watch('name',function(newVal,oldVal){
			    console.log('old :' + oldVal);
			    console.log('new :' + newVal);
			//      console.log($scope)
			  });
			});`
		);
		html_editor.setValue(`<div ng-app = 'myApp'>

	<!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js"></script>-->

	  <div ng-controller='myCtrl'>
	   <input type='text' ng-model='name' />
	    {{name}}
	  </div>

	</div> `
		);

	appValue(htmlValue);
	css_editor.setValue('body { color: red; }');


	// RENDER CALL ON PAGE LOAD
	// NOT NEEDED ANYMORE, SINCE WE RELY
	// ON CODEMIRROR'S onChange OPTION THAT GETS
	// TRIGGERED ON setValue
	// render();


	// NOT SO IMPORTANT - IF YOU NEED TO DO THIS
	// THEN THIS SHOULD GO TO CSS

	/*
		Fixing the Height of CodeMirror.
		You might want to do this in CSS instead
		of app and override the styles from the main
		codemirror.css
	*/
	var cms = document.querySelectorAll('.CodeMirror');
	for (var i = 0; i < cms.length; i++) {

		cms[i].style.position = 'absolute';
		cms[i].style.top = '30px';
		cms[i].style.bottom = '0';
		cms[i].style.left = '0';
		cms[i].style.right = '0';
    cms[i].style.height = '100%';
	}
	/*cms = document.querySelectorAll('.CodeMirror-scroll');
	for (i = 0; i < cms.length; i++) {
		cms[i].style.height = '100%';
	}*/

}());
