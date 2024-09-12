# LiveThreat Backend API
## Installation Guide
### 1. Install Dependency
First of all, you need to install dependency using this command
```
npm install
```
### 2. Run SQL Query
Make sure, before you start the server, you already connected to database and have all necessary tables. To create the tables, you can run SQL query that has provided inside `files` folder
### 3. Start Development Server
Last, to run development server, you need to run this command
```
npm run start
```

## Web Socket Client
To trigger functionality for web socket method in the backend side, you can open `client/client.html` in your browser. Adjust your `APP_PORT` inside that file.

After that, live threat attacks data will be triggered every 3 minutes.

## Integration Test
To ensure all functionality run well, you can run integration test using this command
```
npm run test
```

## API Documentation
Postman documentation provided in this url: [Click Here](https://documenter.getpostman.com/view/11912848/2sAXqmBkbi)