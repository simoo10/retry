#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>

typedef struct s_client{
    int id;
    char message[290000];
}t_client;

fd_set read_set;
fd_set write_set;
fd_set current;

t_client clients[1024];

int maxfd = 0;
int gid = 0;

char sendbuffer[300000];
char recievebuffer[300000];

void    MessageError(char *message)
{
    if (message)
        write(2, message, strlen(message));
    else
        write(2, "Fatal error", 11);
    write(2, "\n", 1);
    exit(1);
}

void    sendall(int except)
{
    for (int fd = 0; fd <= maxfd; fd++)
    {
        if (FD_ISSET(fd, &write_set) && fd != except)
            if (send(fd, sendbuffer, strlen(sendbuffer), 0) == -1)
                MessageError(NULL);
    }
}

int main(int argc, char **argv)
{
    if (argc != 2)
        MessageError("Wrong number of arguments");
    struct sockaddr_in serveraddr;
    socklen_t len;
    int serverfd = socket(AF_INET, SOCK_STREAM, 0);
    if (serverfd == -1)
        MessageError(NULL);
    maxfd = serverfd;

    FD_ZERO(&current);
    FD_SET(serverfd, &current);
    bzero(clients, sizeof(clients));
    bzero(&serveraddr, sizeof(serveraddr));


    serveraddr.sin_family = AF_INET;
    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);
    serveraddr.sin_port= htons(atoi(argv[1]));

    if (bind(serverfd, (const struct sockaddr*)&serveraddr, sizeof(serveraddr)) == -1 || listen(serverfd, 100) == -1)
        MessageError(NULL);
    while (1)
    {
        read_set = write_set = current;
        if (select(maxfd + 1, &read_set, &write_set, 0, 0) == -1)
            MessageError(NULL);
        for (int fd = 0; fd <= maxfd; fd++)
        {
            if (FD_ISSET(fd, &read_set))
            {
                if (fd == serverfd)
                {
                    int clientfd = accept(serverfd, (struct sockaddr*)&serveraddr, &len);
                    if (clientfd == -1)
                        continue;
                    if (clientfd > maxfd)
                        maxfd = clientfd;
                    clients[clientfd].id = gid++;
                    FD_SET(clientfd, &current);
                    sprintf(sendbuffer,"server: client %d just arrived\n", clients[clientfd].id);
                    sendall(clientfd);
                }
                else
                {   
                    int rcv = recv(fd, recievebuffer, sizeof(recievebuffer), 0);
                    if (rcv <= 0)
                    {
                        sprintf( sendbuffer,"server: client %d just left\n", clients[fd].id);
                        sendall(fd);
                        FD_CLR(fd, &current);
                        close(fd);
                        bzero(clients[fd].message, strlen(clients[fd].message));
                    }
                    else
                    {
                        for (int i = 0, j = strlen(clients[fd].message); i < rcv; i++, j++)
                        {
                            clients[fd].message[j] = recievebuffer[i];
                            if (clients[fd].message[j] == '\n')
                            {
                                clients[fd].message[j] = '\0';
                                sprintf(sendbuffer, "client: %d %s\n", clients[fd].id, clients[fd].message);
                                sendall(fd);
                                bzero(clients[fd].message, strlen(clients[fd].message));
                                j = -1;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
}