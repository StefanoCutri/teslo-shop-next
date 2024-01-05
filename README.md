# Next.js Teslo-Shop

## This is an ecommerce built with Next.js and React

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

Call locally:

```
http://localhost:3000/api/seed
```
