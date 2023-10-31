# shopping_API

### Set Up Migration & Start engine server
- Go to package.json you need to change the type to common.js because this code using ES6, so you need to change like this Example :
- change your package.json like this if you want to run migration
- {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "commonjs", 
    "types": "module", 

- after you done in your migration you need to change the package.json to start server in your local. EX:
- {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "types": "commonjs",

### Security
This system using level security, below is the security for implemented this system :
- Basic Auth
- JWT
- Transaction commit & rollback

### Performance 
This system already implemented some performance to help traffic request & the order features :
- Multi thread worker/cluster system (purpose to help system to handling request in large scale)
- Set timeout for API

