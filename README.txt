Instructions to run the project:

Install node with npm(node package manager):
    #code
        sudo apt-get install python-software-properties
        sudo apt-add-repository ppa:chris-lea/node.js
        sudo apt-get update
        sudo apt-get install nodejs npm
        
   Once you install node and npm, you should be able to run this
    #code
        npm search

Now, get a hold of "express" which is layout manager for node.js. 
Once you install node.js, this is what you need to do:
    #code
        sudo npm install express -g
        
Extract the contents from StateSync.zip, and go to the directory
Start your node.js application using
    #code
        cd StateSync
        node app.js

The application should be up and running now.
Go to http://localhost:3000/

// Details of the project.
JavaScript/HTML5:
	- The front end has two div's that has a block, which is movable.
	- Every 1/10th of the second, the left block coordinates are sent to the servlet using an ajax request.
	- Every 1/10th of the second, the right block gets coordinates from the server and updates the position of the right block.

app.js:
	- It has a single script that handles ajax requests.
	- When the left block sends the coordinates of the block, the static x and y variables are updated.
	- When the right block requests for coordinates, the static x and y coordinates are fetched and sent.
	
	
Pooling is done 1/10th of a second, which is 100ms, which can be changed from the below two lines of code from netgames.js
setInterval ( "updateValues()", 100 );
setInterval ( "getValues()", 100 );



Instructions for students to replicate this project:
	- Needs to have a front end with two vertical divisions.
	- One box in the left div which is movable. 
	- The box in the right div should be able to move automatically based on the movement of the left box.
	- This is achieved by sending AJAX requests updating a server component whenever the box from left div is changed.
	- The box from right division constantly request for updated coordinates.
	- The server component should be able to handle AJAX requests and update a static x and y variables.
	- Using Node.js is recommended.
