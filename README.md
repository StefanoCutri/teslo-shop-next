# Next.js Teslo-Shop

To run locally, you need the data base

```
docker-compose up -d
```

- -d, means **detached**

- MongoDB local URL:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## Configure environment variables

Rename **.env.template** to **.env**

# Fill database with test information

Call:

```
http://localhost:3000/api/seed
```
