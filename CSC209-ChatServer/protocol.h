#ifndef PROTOCOL_H_
#define PROTOCOL_H_

#define PORT 16000 //This number can be changed 10000 - 32767
#define WRITEDATA 128
#define READDATA 256
#define BACKLOG 10     /* how many pending connections queue will hold*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>    
#include <netdb.h>
#include <string.h>
#include <strings.h>    
#include <errno.h>
#include <arpa/inet.h>
#include <sys/wait.h>
#include <signal.h>

//Message structure
typedef struct msgdata
{
	//type of message
	char type;
	//other user for PM
	char otheruser[WRITEDATA-1];
	//message content
	char message[WRITEDATA];
} msg;

//User structure
typedef struct userinfo
{
	//socket id
	int socket;
	//user name
	char name[WRITEDATA-1];
	//user status
	char status[WRITEDATA];
} client;

int Accept(int fd, struct sockaddr *sa, socklen_t *salenptr);
void Bind(int fd, const struct sockaddr *sa, socklen_t salen);
int Connect(int fd, const struct sockaddr *sa, socklen_t salen);

void Listen(int fd, int backlog);
int Select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds,
       struct timeval *timeout);

int Socket(int family, int type, int protocol);
void Close(int fd);

void Writen(int, void *, size_t);
ssize_t Readn(int, void *, size_t);
ssize_t Readline(int, void *, size_t);
void parseInput(char *line, msg * mess);

#endif /*PROTOCOL_H_*/
