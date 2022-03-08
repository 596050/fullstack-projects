# Server

To initially setup the django server, run in a terminal:

```sh
cd ./server
docker-compose up --build
```

If the docker container is built, use:

```sh
docker-compose up
```

The database should be set up with a super user with username: `root` and
password `root`. Otherwise, this command can be used, inside the docker
container, to create a super user if access to the admin panel is required:

```sh
docker-compose run api sh
python3 manage.py createsuperuser
```

# Client

To set up the client, run in a terminal:

```sh
cd ./client
yarn
yarn start
```
