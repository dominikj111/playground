FROM php:8.2.17-fpm-bookworm

RUN apt update && apt upgrade -y
RUN apt install -y unzip zlib1g-dev libpng-dev

RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd # zlib1g-dev libpng-dev

WORKDIR /root

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer
RUN chown -R www-data:www-data /var/www

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /var/www
USER www-data
