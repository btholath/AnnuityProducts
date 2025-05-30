
## Setup Node.js for backend app using Javascript
Using express web framework for Node.js
Folder: back-end/
Contains your Express + Mongoose server, including index.js


bijut@b:~/annuity_products$ mkdir back-end 
bijut@b:~/annuity_products$ cd back-end 
// creates package.json file 
bijut@b:~/annuity_products/back-end$ npm init -y 
bijut@b:~/annuity_products/back-end$ npm install express npm install cors dotenv mongodb redis @socket.io/redis-adapter socket.io npm list --depth=0
bijut@b:~/annuity_products/back-end$ npm install express mongoose cors



## Create server.js and .env configuration parameter file
PORT=3000
MONGO_URL=mongodb://localhost:27017
REDIS_URL=redis://localhost:6379

mkdir -p src
touch src/server.js



bijut@b:~/annuity_products/back-end$ node index.js
🚀 Backend running at http://localhost:4000

In Postman use POST to https://studious-space-enigma-w5rwvgrjx5pcgwrw-3000.app.github.dev/hello with Body raw { "name":"Biju"

}

Enable to run the server.js even when changes are being made to it
@btholath ➜ /workspaces/EchoBoard/echoboard-back-end (main) $ npm install --save-dev nodemon @btholath ➜ /workspaces/EchoBoard/echoboard-back-end (main) $ npx nodemon src/server.js [nodemon] 3.1.10 [nodemon] to restart at any time, enter rs [nodemon] watching path(s): . [nodemon] watching extensions: js,mjs,cjs,json [nodemon] starting node src/server.js Server is running on port 3000

or, you can also make following addition to the package.json scripts, and then run the server.js by command "npm run dev" "scripts": { "dev": "npx nodemon src/server.js" },