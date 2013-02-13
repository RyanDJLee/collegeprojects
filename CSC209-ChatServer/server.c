#include "protocol.h"

int
Accept(int fd, struct sockaddr *sa, socklen_t *salenptr)
{
    int  n;

    if ( (n = accept(fd, sa, salenptr)) < 0) {
        perror("accept error");
        exit(1);
    }
    return(n);
}

void
Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0){
        perror("bind error");
        exit(1);
    }
}

int
Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    int result;
    if ((result = connect(fd, sa, salen)) < 0) {
        perror("connect error");
    }
    return(result);
}

void
Listen(int fd, int backlog)
{
    if (listen(fd, backlog) < 0) {
        perror("listen error");
        exit(1);
    }
}

int
Select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds,
       struct timeval *timeout)
{
    int n;

    if ( (n = select(nfds, readfds, writefds, exceptfds, timeout)) < 0) {
        perror("select error");
        exit(1);
    }
    return(n);              /* can return 0 on timeout */
}


int
Socket(int family, int type, int protocol)
{
    int n;

    if ( (n = socket(family, type, protocol)) < 0) {
        perror("socket error");
        exit(1);
    }
    return(n);
}

void
Close(int fd)
{
    if (close(fd) == -1) {
        perror("close error");
        exit(1);
    }
}

void sigchld_handler(int s)
{
  wait(NULL);
}

//parse the user input into a data structure 
void parseInput(char *line, msg * mess) {
	char * buf;
	buf = (strtok(line, " "));
	
	//Store first character as the type
	mess->type = *buf;

	//extra token for PM's
	if (mess->type == 'M') {
		buf = strtok(NULL, " ");
		//Set the otheruser
		strncpy(mess->otheruser, buf, WRITEDATA-1);
	}
	
	//last token at end of line
	buf = strtok(NULL, "\n");
	//store the message 
	strncpy(mess->message, buf, WRITEDATA);
	mess->otheruser[WRITEDATA-2]='\0';
	mess->message[WRITEDATA-1]='\0';
}

int main (int argc, char **argv)
{
	//Initialize variables
    int i, j, maxindex, maxfd, listenfd, connfd, nready;
	client clients[BACKLOG];
    ssize_t	n;
    fd_set	rset, allset;
    msg	output;
	char line[READDATA];
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;
    int yes = 1;
    
    //get the listening fd
    listenfd = Socket(AF_INET, SOCK_STREAM, 0);
	
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family      = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port        = htons(PORT);
	printf("Server started on port %d\n", PORT);
	
    if((setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int)))
       == -1) {
        perror("setsockopt");
    }
	
    //Bind the host and init listen socket
    Bind(listenfd, (struct sockaddr *) &servaddr, sizeof(servaddr));
	
    Listen(listenfd, BACKLOG);
	
    //initialize and index into array
    maxfd = listenfd;	
    maxindex = -1;		
    //set up clients
    for (i = 0; i < BACKLOG; i++) {
		clients[i].socket = -1;	
    }
    
    //clear and add listen socket to set
    FD_ZERO(&allset);
    FD_SET(listenfd, &allset);
    
    while(1) {
    	
    	//set up select, rset is a temp fd set
		rset = allset;		
		nready = Select(maxfd+1, &rset, NULL, NULL, NULL);
		
		//new client connection
		if (FD_ISSET(listenfd, &rset)) {	
			clilen = sizeof(cliaddr);
			connfd = Accept(listenfd, (struct sockaddr *) &cliaddr, &clilen);	
			//Client is accepted
			for (i = 0; i < BACKLOG; i++) {
				if (clients[i].socket < 0) {
					clients[i].socket = connfd;	/* save descriptor */
					char name[WRITEDATA-1];
					//initialize client info
					sprintf(name, "client[%d]", i);
					strncpy(clients[i].name, name, strlen(name));
					strncpy(clients[i].status, "", BACKLOG);
					sprintf(line,"A new client has connected.\n");
					break;
				}
			}
			
			//If too many clients
			if (i == BACKLOG) {
				sprintf(line,"too many clients, try again later.\n");
			}
			
			//add new fd to set
			FD_SET(connfd, &allset);
			if (connfd > maxfd) {
				maxfd = connfd;
			}
			//Maxindex is max index of client set
			if (i > maxindex) {
				maxindex = i;	
			}
			
			//Write messages to client
			for(j=0; j<=maxindex; j++)
			{
				if(clients[j].socket>=0)
				{
					Writen(clients[j].socket, line, strlen(line));
				}
			}
			
			if (--nready <= 0)
				continue;	/* no more readable descriptors */
		}
		
		for (i = 0; i <= maxindex; i++) {	/* check all clients for data */
			//if the client has no data, go to the next one
			if ( (clients[i].socket) < 0) {
				continue;
			}
			
			//need to set a flag to see if the msg is global or not
			//and another variable to see if PM user was found
			int isglobal=0;
			int found = 0;
			
			//Check a client who is connected
			if (FD_ISSET(clients[i].socket, &rset)) {
				
	       //The client logs off if there is nothing incoming from the socket
				if ( (n = Readline(clients[i].socket, line, WRITEDATA)) <= 0) {

					sprintf(line, "%s (%s) logged off.\n", clients[i].name, 
							clients[i].status);
					Close(clients[i].socket);
					FD_CLR(clients[i].socket, &allset);
					clients[i].socket = -1;
					
			//else the client sent data, so parse it		
				} else {
					parseInput(line, &output);

					//switch depending on type of input
					switch(output.type){
					
					//Login
						case 'L': 
						{
							//Change to the new username
							char oldname[WRITEDATA-1];
							strncpy(oldname, clients[i].name, WRITEDATA-1);
							strncpy(clients[i].name, 
									output.message, WRITEDATA-1);
							
							for(j=0; j<=maxindex; j++) {
								
								//If the client id is already connected, 
								//output the error message
								if(clients[j].socket>=0 &&
								   strncmp(clients[j].name, output.message,
										   WRITEDATA-1)==0 && j != i) {
									
									Writen(clients[i].socket,
							"You are not allowed to logon again.\n", READDATA);
									
									//disconnect the client
									Close(clients[i].socket);
									FD_CLR(clients[i].socket, &allset);
									clients[i].socket = -1;
								}
							}
							
							sprintf(line, 
									"%s has logged on.\n", clients[i].name);
							break;
						}
						
						//Change of status
						case 'S':
						{
							strncpy(clients[i].status, 
									output.message, WRITEDATA);
							sprintf(line, "%s (%s):\n", clients[i].name, 
									clients[i].status);
							break;
						}
						
						//Broadcast message
						case 'B': 
						{
							sprintf(line, "%s (%s): %s\n", clients[i].name, 
									clients[i].status, output.message);
							break;
						}
						
						//PM another user
						case 'M': 
						{
						isglobal=1;
					
						//if user pm's themself
						if (strncmp(clients[i].name,output.otheruser,
								strlen(clients[i].name)) == 0) {
							sprintf(line, "You cannot PM yourself.\n");
							Writen(clients[i].socket,line,strlen(line));
							break;
						}
							
						//Check for other user and send PM
							for(j=0; j<=maxindex; j++) {
							if(clients[j].socket>=0)  {
								if(!strncmp(clients[j].name,
										output.otheruser, WRITEDATA-1)) {
									found = 1;
									sprintf(line, "%s (PM): %s\n", 
											clients[i].name, output.message);
									Writen(clients[j].socket,
											line, strlen(line));
									break;
								}
						       }
						    }

							//If user was not found
							if (found == 0) {
								sprintf(line,"User is not online.\n");
								Writen(clients[i].socket,line,strlen(line));
							}
							
							break;
							
							}
						}

					}
				
				//If the message is a global msg, then write to the client
					if(isglobal==0) {
						
						for(j=0; j<=maxindex; j++) {
							
							if(clients[j].socket>=0) {
								Writen(clients[j].socket, line, strlen(line));
							}
						}
					}
					
					if (--nready <= 0)
						break;	/* no more readable descriptors */
				}
			
		}
    }
}

