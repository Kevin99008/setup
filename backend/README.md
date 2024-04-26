# KOA User CRUD App 
# MongoDB

## Structure

```
|- backend
  |- config
    |- components
      database.config.js
      server.config.js
    index.js
  |- controllers
    users.controllers.js
  |- middleware
    error.middleware.js
  |- models
    users.models.js
  |- mongo (persist database)
  |- routers
    users.routers.js
  node_modules
  .env
  .env.example
  package.json
  package-lock.json
  docker-compose.yml
  dockerfile
  README.md
```

### Start Project

```sh
npm install
docker-compose up -d
```

### Develop on window 11