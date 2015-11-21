var myCodeMirror2 = CodeMirror(document.body, {
  lineNumbers: true,
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});

function submit() {
  var temp = myCodeMirror.getValue();
  var func = new Function(temp);
  func();

}
console.log('hello from main2.js');

myCodeMirror.linkedDoc();
