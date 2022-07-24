# Setup

Create two .env files in the directories /frontend and /backend with the following content

Frontend .env

```
VITE_BACKEND_URI=http://localhost:4000 # change this if not running on localhost
```

Backend .env

```
ACCESS_TOKEN_SECRET=296db13b9cf4281606caceb0b545855b
MONGODB_URI=mongodb://<username>:<password>@<db_uri>:<port>/pegaso-warehouse?authSource=admin
NODE_ENV=production
FRONTEND_URI=https://localhost:3000 # change this if not running on localhost
BACKEND_URI=http://localhost:4000 # change this if not running on localhost
```

Then create a MongoDB database named `pegaso-warehouse`.
To build the frontend do `npm run build`. The dist folder will then contain the build html, css, js files.
To start the backend first do `cd backend` and then `npm run build`, `npm start`. 