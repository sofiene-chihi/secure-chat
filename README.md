# Secure Chat

What different from the other Chat application?
Not many chat applications really provide data security and privacy. The conversations are processed by big data engines and the users data is used for advertisement and even selled to other companies.

### Privacy and Data security

The 2 major parts that secure chat is based on are :

* Data security
* Users privacy
  

Data security through the **End to End Encryption** and the fact that each conversation is completely deleted after its end (a limit of 2h for each conversation).

Users privacy is garanteed since each user doesn't need to provide any informations, just a name and a random ID will be generated for that user.

### Performance

The stateless nature of the application doesn't just garantee the conversation privacy and security. In fact the conversations and users data are stored in an in-memory database ( Redis DB ) that provides a very high performance in retrieving and storing data.

## Architecture

The project architecture is quite simple where we have :

* Frontend with Angular
* Backend With NestJS
* In memory database Redis

<br>

<p align="center">
  <img src="./assets/images/app-architecture-diagram.drawio.png" title="workflow diagram">
</p>

The communication between the Frontend and the Backend is based on REST API requests and Web Socket for the realtime communication in users conversations.


## Application current state
This application is working for only one conversation, still need to manage the keys for many conversations and test other features.
Also needs code refactoring (It's a mess in some modules)


Hopefully will get back to it soon 😁

## How to run it
- Make sure that you have Angular, Nest JS and docker available
- install the dependencies for the frontend and backend using `npm i`
- run the redis DB using `make redis_up` and the backend `npm run start:dev` in the backend project
- run the frontend using `ng serve --open` in the frontend project