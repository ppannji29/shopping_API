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

- do below this statement. after you done in your migration you need to change the package.json to start server in your local  
- {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "types": "commonjs",

### Security API & DATA
This system using level security & data security, below is the security for implemented this system :
- Basic Auth
- JWT
- CORS
- Transaction commit & rollback

### Performance 
This system already implemented some performance to help traffic request & the order features :
- Multi thread worker/cluster system (purpose to help system to handling request in large scale)
- Set timeout for API
- Indexes Fields

### API Collection
You can visit on file /backend/request.rest
Remember to access every each API you need token. the token is self already inside for every each API Collection. But for JWT you need to hit GET http://localhost:5000/api/token to get refreshToken or valid token

### Sequence of workflow from API visibility
- POST http://localhost:5000/api/user/registration (registration first step)
- PUT http://localhost:5000/api/userprofile/:userId (completed registration to enable isRegistered)
- POST http://localhost:5000/api/login (API for login)
- GET http://localhost:5000/api/token (API for refreshToken user)
- DELETE http://localhost:5000/api/logout (API for Logout & remove user token cookies)
- POST http://localhost:5000/api/order (API for add order list with management stock)
- GET http://localhost:5000/api/order (API for get active order list)
- POST http://localhost:5000/api/checkout (API for checkout order list & sent transaction)
- DELETE http://localhost:5000/api/checkout/:orderId (API for delete order with management stock & quantity)
- PUT http://localhost:5000/api/checkout/:orderId/:quantity (API for update order with price, management stock & quantity)

### Tables 
- user
- userprofile
- order
- product
- shop
- warehouse
- transaction

### Testing
folder path => backend/unit-test/testing/user.test.ts
