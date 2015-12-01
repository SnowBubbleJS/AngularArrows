/*
* PROBLEMS, YOU CAN CTRL+F EACH PROBLEM TO JUMP TO CODE SECTION...
* FIXED WITH UNDERLINE: The HIGHLIGHT class goes over text selection...
*
*/


(function() {
	var word1, word2, appPos, controllerPos, SVGPresent = 0;

	function underlineWord(query) {
		var jquerySelection = $(query);
		var matchContainer = [];
		// if(word1 !== null) {
		// console.log(jquerySelection);
		for (var i = 0; i < jquerySelection.length; i++) {
			var selection = jquerySelection[i];
			// console.log(selection);
			while(selection) {
				if(selection.nextElementSibling) {
					selection = selection.nextElementSibling;
				} else {
					matchContainer.push(selection);
					selection = null;
				}
			}
		}

		matchContainer.forEach(function(item) {
			item.className += ' highlight'
			console.log(item);
		})

		// 	if($('.cm-property:contains(module)')) {
		// 	word1 = $('.cm-string:contains(Codesmith)').first().position();
		// 	word2 = $('.cm-string:contains(Codesmith)').last().position();
		// 	$('.cm-string:contains(Codesmith)')[0].className += ' highlight';
		// 	$('.cm-string:contains(Codesmith)')[1].className += ' highlight';
		// }
		// if($(query)[0]) {
		// 		if($(query)[0].className.indexOf('highlight') <= 0) {
		// 		word1 = $(query).first().position();
		// 		word2 = $(query).last().position();
		// 		$(query)[0].className += ' highlight';
		// 		$(query)[1].className += ' highlight';
		// 	}
		// 	appPos = $('#app').position();
		// 	controllerPos = $('#controller').position();
		// }
		// }
	}
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
		// CREATE LINE
		// ADD HIGHLIGHT CLASS TO 2 STRINGS THAT CONTAIN 'Codesmith'
		$(document).ready(function() {

			function toggleSVG() {
				// Curved line
				var curved = d3.svg.line()
						.x(function(d) { return d.x; })
						.y(function(d) { return d.y; })
						.interpolate("cardinal")
						.tension(0);
						appPos = $('#app').position();
						controllerPos = $('#controller').position();
				// Defining variables to save time in 'points' step
				var x1 = appPos.left + 30 + word1.left;
				var y1 = appPos.top + 60 + word1.top;
				var x2 = controllerPos.left + 30 + word2.left;
				var y2 = controllerPos.top + 60 + word2.top;

				// Points on line... need min 3 points
				var points = [ { x: x1, y: y1 },{ x: (x1+x2)/2, y: y2+30 },{ x: x2, y: y2 }]

				// Creating container svg for path
				var lineGraph1 = d3.select('body')
					.append("svg:svg")
					.attr("width", '100%')
					.attr("height", '100%')
					.attr("id", "CtrlSVG");

				// Actual path appended into svg
				lineGraph1.append('path')
					.attr('d', curved(points))

				// OLD LINE, ONLY STRAIGHT LINE... USE WITH LINEGRAPH1 (but without append('path'))
				// var myLine1 = lineGraph1.insert("svg:line")
				// 	.attr("x1", appPos.left + 30 + word1.left)
				// 	.attr("y1", appPos.top + 60 + word1.top)
				// 	.attr("x2", controllerPos.left + 30 + word2.left)
				// 	.attr("y2", controllerPos.top + 60 + word2.top)
				// 	.style("stroke", "rgb(6,120,155)");
			} // ToggleSVG function
// The HIGHLIGHT class goes over text selection...


			underlineWord('.cm-property:contains(module)');
			// To only create one SVG
			if(SVGPresent === 0) {
				toggleSVG();
				SVGPresent++;
			}
		}
	);
			// underlineWord('.cm-string:contains(Codesmith)')

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
		// inst.display.lineDiv.className += ' highlight';
		// inst.display.lineDiv.firstChild.lastChild.className += 'highlight';
		// console.log(inst.display.lineDiv);


// HIGHLIGHT WORD
		// if(inst.display.view[0]) {
		// 	word = inst.display.view[1].text.firstChild.querySelectorAll('span')
		// 	wordPos = $(word[3]).position();
		// 	word[3].className += ' highlight'
		// 	console.log(inst.display.view[0].text.firstChild.firstChild.className);
		// }
		// for(var i = 0, j = inst.doc.children[0].lines.length; i < j; i++) {
		// 	console.log(inst.doc.children[0].lines[i]);
		// }
    render();
  });

	// CONTROLLER EDITOR
	cm_opt.mode = 'controller';
	var controller_box = document.querySelector('#controller textarea');
	var controller_editor = CodeMirror.fromTextArea(controller_box, js_opt);


	controller_editor.on('change', function (inst, changes) {
		
		render();
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

}());


// TOGGLE CSS EDITOR
$('#button').click(function() {
	$('#css').toggle();
	$('.code_box').toggleClass('bigBoxes');
});

$('#SVGButton').click(function() {
	$('#CtrlSVG').toggle();
});
