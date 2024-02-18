# Some notes

Before using specific network for containers, you should create it first: `docker network create wp-network`.

```(yml)
networks:
  default:
    name: wp-network
```

To run python, bash, lua, ... instead php, check these:

- [github.com/KTOmega/docker-nginx-fastcgi](https://github.com/KTOmega/docker-nginx-fastcgi)
- [stackoverflow.com ... how-to-run-a-shell-script-on-every-request](https://stackoverflow.com/questions/22891148/how-to-run-a-shell-script-on-every-request)
