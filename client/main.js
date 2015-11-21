var myCodeMirror = CodeMirror(document.body, {
  lineNumbers: true,
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});

function submit() {
  var temp = myCodeMirror.getValue();
  var func = new Function(temp);
  func();

}

// var myCodeMirror2 = CodeMirror(document.body, {
//   value: "function myScript(){return 100;}\n",
//   mode:  "javascript"
// });

myCodeMirror.linkedDoc();

var myCodeMirror3 = CodeMirror(document.body, {
  lineNumbers: true,
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});

var myCodeMirror4 = CodeMirror(document.body, {
  lineNumbers: true,
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});

// document.querySelector(".CodeMirror").addLineClass(1, 'background', "highlighted-line");
