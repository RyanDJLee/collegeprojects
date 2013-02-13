========================
Pablo family tree viewer
========================

--Design--

The Pablo family tree viewer is meant to be simple and easy to use. Therefore, our design emphasizes more on
usability than on functionality. We incorporate most of the simple functions associated with having a family
tree viewer. 

--Layout--
We have a Web 2.0 style layout, with a friendly banner and a Legend representing the types of relationships and
nodes. The canvas is more wide than skinny to account for wide family trees. The main panes are below the canvas
which will be explained below.

--Features--
Pan/Highlight:
Pan is implemented using the move() handler and the highlight using the showInfo() function. If a node is
clicked, it is highlighted and information is shown. If a node is double clicked, it will highlight and center
to that node. The images for the nodes and highlight image can be changed through constants in the
customcake.js.

Search:
The search2() function searches for any node in the canvas by id and pans it to the center.

Switch trees:
The ability to switch to multiple family trees which is done using the showTest() function. Every time a new
tree is loaded the old tree changes are lost. 

Zoom:
The zoom function uses the zoom2() function to zoom in or out. The max and min scales are all set in the
customcake.js file.

Info pane:
The information pane displays the current information of the highlighted node and also supports the ability to
edit the information. This is handled through the modify() function.

Photo:
Users can upload photo through the upload button, they have to set the default library path and the default photo
through the DEFAULT_PHOTO and LIBRARY_PATH constants in customcake.js. Once the photo is uploaded, it is
associated with that node and the information persists.

Add node:
Users can add nodes through the add family member pane handled through the addnode() function. The function
automatically handles malicious input (no first name selected, marrying two females, etc) by doing nothing if
the user inputs those cases. The add node function currently is bugged and does not work after the basic case
(two parents, one child). 


--Files--
demo.html - the main page used to display everything
fakedata.js - hardcoded data used to store the sample trees
readme.txt - this file
robustness diagram.jpg - the robustness diagram for this application

The /lib folder contains all the css,js files and images used:
cake.js - the library for CAKE, the js framework we are using
custom.css - the css file containing all the layout properties
customCake.js - the js file used to draw images and relationships on the canvas, as well as pan and
zoom.
familyTree.js - the js file containing the factories used to build the family trees
jquery.js - JQuery provides additional functionality that might be used in future implementations
layoutManager.js - js file containing the builder and decorator patterns for setting up the layout for
nodes and relationships
main.js - the main file containing most of the functions used and the init() function that sets
everything up
All images used in the lib folder are used in the application and also can be used to upload.


