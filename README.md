# sdp
<b>A WIP web system designer.</b><br />
<br />
Currently there are four components;<br />
1.App.vue is the canvas, intended to be singleton.<br />
2.Tools.vue is the tool bar component, also intended to be singleton.<br />
3.Input.vue is a component for input elements added via tool's "add element" function.<br />
4.InputGUI.vue is a component for manipulating input elements. Instances are created at the same time Input.vue instances are created.<br />
<br />
<b>TODO list</b><br />
1.Add detailed design properties and a dialog to edit said properties.<br />
2.Add more input types other than input[type=text]: textarea, select etc.<br />
3.Add more element types: labels, comments.<br />
4.Implement a responsive design.<br />
5.Implement a save function.<br />
6.Implement a function to export file.<br />
<br />
