# FROM php:7.4.23-fpm-buster
FROM php:zts-bookworm

ARG CENV
ARG CTZ
ARG CLOCALE
ARG GITEMAIL
ARG GITENAME

RUN apt update && apt upgrade -y

##################################
# LOCALES/TIMEZONE CONFIGURATION #
##################################

RUN apt-get install -y locales

ENV TZ=${CTZ}
RUN ln -snf /usr/share/zoneinfo/${CTZ} /etc/localtime && echo ${CTZ} > /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

ENV LC_ALL=${CLOCALE}
ENV LANG=${CLOCALE}
ENV LANGUAGE=${CLOCALE}
RUN sed -i "/${CLOCALE}/s/^#\s//g" /etc/locale.gen
RUN locale-gen
RUN update-locale

#################
# Dev Toolchain #
#################

# RUN apt-get install -y vim sudo wget
# RUN usermod -a -G sudo www-data
RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer

# fix ownership of the home folder (composer cache issue)
# RUN chown -R www-data:www-data /var/www
# RUN echo "www-data ALL=(ALL) NOPASSWD:/usr/bin/composer" > /etc/sudoers.d/www-data

RUN apt-get install -y vim git zip curl

RUN git config --global user.email "${GITEMAIL}}"
RUN git config --global user.name "${GITENAME}"

#########
# msmtp #
#########

RUN apt-get install -y msmtp mutt
