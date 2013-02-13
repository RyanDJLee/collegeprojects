PORT= 16000
CFLAGS= -DPORT=${PORT} -g -Wall
SRC =  server.c client.c readline.c writen.c

all : status_server status_client

status_client: client.o writen.o readline.o
	gcc ${CFLAGS} -o $@ $^
	
status_server: server.o writen.o readline.o
	gcc ${CFLAGS} -o $@ $^
	
# Separately compile each C file
%.o : %.c 
	gcc ${CFLAGS} -c $<

# Update all dependencies.
depend : 
	makedepend ${SRC}

clean :
	-rm *.o
