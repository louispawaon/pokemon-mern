# pokemon-mern
MERN Project with JWT approach for Authentication and Authorization.

### [API Guide](https://github.com/louispawaon/pokemon-mern/blob/main/server/README.md)
### [Server Backend Checklist](https://github.com/louispawaon/pokemon-mern/tree/main/server#checklist)
### [Client Frontend Checklist](https://github.com/louispawaon/pokemon-mern/blob/main/client/README.md#checklist)

## Technology Stack

### Frontend *(Client)*
- [**React (*powered by Vite*)**](https://vitejs.dev/guide/) - Front-End Framework
- [**TypeScript**](https://www.typescriptlang.org/) - Programing Language for Type-Safety
- [**TailwindCSS**](https://tailwindcss.com/docs/installation) - CSS Framework of choice
- [**Vitest**](https://vitest.dev/guide/) - Testing Library

### Backend *(Server)*
- [**NodeJS**](https://nodejs.org/en) - JavaScript Runtime
- [**TypeScript**](https://www.typescriptlang.org/) - Programing Language for Type-Safety
- [**Express**](https://expressjs.com/) - Web Framework for Nodejs
- [**MongoDB**](https://www.mongodb.com/) - Database
- [**Mongoose**](https://mongoosejs.com/) - Object Modeler for MongoDB
- [**Jest**](https://jestjs.io/) - Testing Library

## General Setup for the Application
1. **Clone the Repository**
    ```
    git clone git@github.com:louispawaon/pokemon-mern.git
    ```
    or

    ```
    git clone https://github.com/louispawaon/pokemon-mern.git
    ```
2. **Fetch for updates**
    ```
    git fetch origin
    ```
3. **Go to each of the folders and install their individual libraries**

    ```
    //Server
    cd server
    npm i

    //Client
    cd client 
    npm i
    ```
## Running the Application

### Server
1. Go to the server folder
   ```
   cd server
   ```
2. Create your `.env` file based on the [`.env.example`](https://github.com/louispawaon/pokemon-mern/blob/main/server/.env.example) file
   1. Generate your own JWT Secret
   ```js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   2. Should you wish to use your own MongoDB database, just include your own **MONGO_URI** directing to your own database
3. Run the server
   ```
   npm run dev
   ```
   *Your server will run on [localhost:3000](http://localhost:3000/)*
4. Run tests
   ```
   npx jest
   ```
5. Run `seed.ts` script if necessary (*as part of requirement #1 in the Express instructions*)
   ```
   npm run seed
   ```

### Client
1. Go to the client server
   ```
   cd client
   ```
2. Run your client 
   ```
   npm run dev
   ```
   *Your client will run on [localhost:5173](http://localhost:5173/)*