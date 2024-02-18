# Quick notes

- `docker pull php:zts-bookworm`
- `docker build -t myphpimage .`
- `docker run --volume $(pwd)/scripts:/app --workdir /app --name php -it myphpimage /bin/bash`
- `docker run --rm --volume $(pwd)/scripts:/app --workdir /app --name php -it myphpimage /bin/bash`
- `docker start -i php`
- `docker rm php`
- `docker run --rm --volume $(pwd)/scripts:/app --workdir /app -t myphpimage ./hello-colours.php`

## PHP CLI tool tutorial

[dev.to => Writing command line scripts in PHP](https://dev.to/gbhorwood/writing-command-line-scripts-in-php-part-1-3jpb)

[tech.osteel.me => How to build CLI applications with PHP and distribute by composer](https://tech.osteel.me/posts/how-to-build-and-distribute-beautiful-command-line-applications-with-php-and-composer)
