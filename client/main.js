/*
* PROBLEMS, YOU CAN CTRL+F EACH PROBLEM TO JUMP TO CODE SECTION...
* html highlighting does not work
*
*/

(function() {
	var appWord1,
			appWord2,
			htmlWord1,
			htmlWord2,
			appPos = $('#app').position(),
			controllerPos = $('#controller').position(),
			SVGPresent = 0;

	// Alt is used to signal that it's looking inside the HTML & Controller.js
	// html highlighting does not work
	function underlineWord(query, alt) {
		var jquerySelection = $(query);
		var matchContainer = [];

		if(alt) {
			var temp = jquerySelection[0].nextElementSibling;
			var ctrlName = jquerySelection[0].nextElementSibling.innerHTML;
			matchContainer.push(jquerySelection[0].nextElementSibling);
			matchContainer.push($('.cm-variable:contains('+ctrlName+')')[0]);
			htmlWord1 = $(temp).offset();
			htmlWord2 = $('.cm-variable:contains('+ctrlName+')').offset();

			if(matchContainer[0].innerHTML.substr(1,matchContainer[0].innerHTML.length -2) === matchContainer[1].innerHTML) {
				matchContainer.forEach(function(item) {
					if($(item)[0].className.indexOf('highlight') === -1) {
						item.className += ' highlight';
					}
				});
			}
			else if(matchContainer[0].innerHTML !== matchContainer[1].innerHTML){
				$('#CtrlSVG').detach();
			}

		}
		// For APP.JS & CONTROLLER.JS highlighting
		else {
			for (var i = 0; i < jquerySelection.length; i++) {
				var selection = jquerySelection[i];
				while(selection) {
					if(selection.nextElementSibling) {
						selection = selection.nextElementSibling;
					} else {
						matchContainer.push(selection);
						selection = null;
					}
				}
			}

			if(matchContainer[0].innerHTML === matchContainer[1].innerHTML) {
				appWord1 = $(matchContainer[0]).offset();
				appWord2 = $(matchContainer[1]).offset();
				matchContainer.forEach(function(item) {
					if($(item)[0].className.indexOf('highlight') === -1) {
						item.className += ' highlight';
					}
				});
			}else if(matchContainer[0].innerHTML !== matchContainer[1].innerHTML){
				console.log('here');
				$('#CtrlSVG').detach();
				console.log($('#CtrlSVG'));
			}
		}


	}

	function toggleSVG(word1, word2) {
		// Curved line
		var curved = d3.svg.line()
				.x(function(d) { return d.x; })
				.y(function(d) { return d.y; })
				.interpolate("cardinal")
				.tension(0);
		// Defining variables to save time in 'points' step

		var x1 =  word1.left;
		var y1 = word1.top+10;
		var x2 = word2.left;
		var y2 =  word2.top+10;


		// Points on line... need min 3 points
		var points = [ { x: x1, y: y1 },{ x: (x1+x2)/2, y: y2+30 },{ x: x2, y: y2 }];

		// Creating container svg for path
		var lineGraph1 = d3.select('body')
			.append("svg:svg")
			.attr("width", '100%')
			.attr("height", '100%')
			.attr("id", "CtrlSVG")
			.attr("opacity",0.3)
			.attr("stroke-width",1.3);

		// Actual path appended into svg
		lineGraph1.append('path')
			.attr('d', curved(points));
	} // ToggleSVG function


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

		$(document).ready(function() {
			// underlineWord('.cm-attribute:contains(ng-controller)', 1);
			$('#CtrlSVG').detach();
			$('#CtrlSVG').detach();
			underlineWord('.cm-property:contains(module)');
			underlineWord('.cm-attribute:contains(ng-controller)', 1);
			toggleSVG(appWord1, appWord2);
			toggleSVG(htmlWord1, htmlWord2);
			underlineWord('.cm-property:contains(module)');
			underlineWord('.cm-attribute:contains(ng-controller)', 1);
		});
	};


	// EDITORS

	// CM OPTIONS
	var cm_opt = {
		mode: 'text/html',
		gutter: true,
		lineNumbers: true,
	};
	var css_opt = {
		mode: 'text/css',
		gutter: true,
		lineNumbers: true,
	};
	var js_opt = {
		mode: 'text/javascript',
		gutter: true,
		lineNumbers: true,
	};


	// HTML EDITOR
	var html_box = document.querySelector('#html textarea');
	var html_editor = CodeMirror.fromTextArea(html_box, cm_opt);

  html_editor.on('change', function (inst, changes) {
    render();
		setTimeout(function(){
			render();
		},0);
  });

	// CSS EDITOR
	cm_opt.mode = 'css';
	var css_box = document.querySelector('#css textarea');
	var css_editor = CodeMirror.fromTextArea(css_box, css_opt);

  css_editor.on('change', function (inst, changes) {
    render();
  });

	// APP EDITOR
	cm_opt.mode = 'app';
	var app_box = document.querySelector('#app textarea');
	var app_editor = CodeMirror.fromTextArea(app_box, js_opt);

  app_editor.on('change', function (inst, changes) {
    render();
		setTimeout(function(){
			render();
		},0);
  });

	// CONTROLLER EDITOR
	cm_opt.mode = 'controller';
	var controller_box = document.querySelector('#controller textarea');
	var controller_editor = CodeMirror.fromTextArea(controller_box, js_opt);


	controller_editor.on('change', function (inst, changes) {

		render();
		setTimeout(function(){
			render();
		},0);
	});

	// SETTING CODE EDITORS INITIAL CONTENT

		app_editor.setValue(
`var myApp = angular
	.module('myApp',['Codesmith.myCtrl']);
`
		);
		html_editor.setValue(
`<div ng-app = 'myApp'>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular.min.js"></script>
	<div ng-controller='myCtrl'>
		<input type='text' ng-model='name' />
    	{{name}}
	</div>
</div>
`
		);
		controller_editor.setValue(
`var myApp = angular
	.module('Codesmith.myCtrl', [])
	.controller(myCtrl, ['$scope', '$http', 'myCtrl'])

function myCtrl($scope, $http) {
  var url = 'http://pokeapi.co/api/v1/pokemon/1/';
	function getPoke() {
		$http.get(url).then(function(res) {
			$scope.name = res.data.name;
		});
	}
	getPoke();
}
`);
	// appValue(htmlValue);
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

	// TOGGLE CSS EDITOR
	$('#button').click(function() {
		$('#css').toggle();
		$('.code_box').toggleClass('bigBoxes');
	});

	$('#SVGButton').click(function() {
		if(document.getElementById('CtrlSVG')) {
			console.log(document.getElementById('CtrlSVG'));
			$('#CtrlSVG').remove();
		} else {
			underlineWord('.cm-property:contains(module)');
			toggleSVG();
		}
	});
}());
