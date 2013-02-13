#include "protocol.h"

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

void
Close(int fd)
{
    if (close(fd) == -1) {
        perror("close error");
        exit(1);
    }
}

int main(int argc, char * argv[])
{

	//init variables
    int sockfd;
    char buf[READDATA];
    struct hostent *hp;
    struct sockaddr_in peer;
	fd_set master;
    peer.sin_family = AF_INET;
    peer.sin_port = htons(PORT);

    
    if ( argc != 2 )
    {  
		fprintf(stderr, "Usage: %s hostname\n", argv[0]);
		exit(1);
    }
	
    /* fill in peer address */
    hp = gethostbyname(argv[1]);                
    if ( hp == NULL ) {  
		fprintf(stderr, "%s: %s unknown host\n",
				argv[0], argv[1]);
		exit(1);
    }
	
    peer.sin_addr = *((struct in_addr *)hp->h_addr);
	
    /* create socket */
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    /* request connection to sockfd */
    if (connect(sockfd, (struct sockaddr *)&peer, sizeof(peer)) == -1)
    {  
		perror("client:connect"); close(sockfd);
		exit(1); 
    }
    
    //clear it and add stdin and server to the set
	FD_ZERO(&master);  
	FD_SET(STDIN_FILENO, &master); 
	FD_SET(sockfd, &master);
	//Make a temp set
	fd_set fds;
	
	//Print welcome message
    printf("Welcome, please login first by typing L followed by your id. \n"
    		"You can update your status by typing S followed by"
    		" a message.\n You can broadcast a message by typing B followed by"
    		 " a message.\n You can PM another user by typing M followed by a"
    		" user name, and then the message.\n");

	while(1) {
		//fds gets reset
		fds = master; 
		
		//Use select to check for input from stdin and server
		Select(sockfd+1, &fds ,NULL,NULL,NULL); 
		if(FD_ISSET(STDIN_FILENO, &fds)) { 
			
			//Read from stdin
			fgets(buf, WRITEDATA, stdin);
			
			//Error checking
			//check for invalid input
		    if (buf == NULL || buf[1] != ' ') {
		    	fprintf(stderr, "Invalid command\n");
		    	continue;
		    } else if (buf[0] != 'L' && buf[0] != 'M' && buf[0] != 'B'
		    	&& buf[0] != 'S') {
		    	fprintf(stderr, "Invalid command\n");
		    	continue;
		    } 
		    
		    //Send to server
			if (strlen(buf) > 0) {
			Writen(sockfd, buf, strlen(buf)); 
			}
		} 
		//If server has outputted data
		else if(FD_ISSET(sockfd, &fds)) {
				//Print what the server sent out
				if ( (Readline(sockfd, buf, READDATA)) <= 0) {
					Close(sockfd);
					printf("Server closed\n");
					exit(0);
				}
				printf("%s", buf);
				
			} 
	} 
}
