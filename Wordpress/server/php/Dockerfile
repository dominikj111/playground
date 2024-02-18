FROM php:fpm-bookworm

RUN apt update && apt upgrade
RUN apt install unzip

RUN docker-php-ext-install mysqli

WORKDIR /root

RUN curl https://en-gb.wordpress.org/latest-en_GB.zip --output wordpress.zip
RUN unzip wordpress.zip && mv wordpress /
RUN chown -R www-data:www-data /wordpress

RUN mkdir /wordpress-configs
RUN chown -R www-data:www-data /wordpress-configs

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /var/www
USER www-data
