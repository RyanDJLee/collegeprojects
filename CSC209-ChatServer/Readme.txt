This chat server project was made for CSC209.

First, make sure you are in a linux-based environment.
Then to make the dependencies, run make all in the cmd prompt. 
Afterwards, two files status_server and status_client should appear.
Run status_server <HOSTADDRESS> first where hostaddress is the ip address of the machine you want to run the server on.
Then run status_client <HOSTADDRESS> preferably from another machine so you can connect to the server. The server should let you know if you have connected successfully.

Commands for client:
use L <userid> to login as userid.
use B <message> to broadcast message to all clients.
use S <status> to change your status.
use M <userid> <message> to PM userid with message.

-Tong Zou