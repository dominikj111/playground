FROM openjdk:21-slim-bookworm

ARG CENV
ARG CTZ
ARG CLOCALE
ARG GITEMAIL
ARG GITNAME

WORKDIR /server

RUN apt update
RUN apt upgrade -y

##################################
# LOCALES/TIMEZONE CONFIGURATION #
##################################

RUN apt install -y locales

ENV TZ=${CTZ}
RUN ln -snf /usr/share/zoneinfo/${CTZ} /etc/localtime && echo ${CTZ} > /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

ENV LC_ALL=${CLOCALE}
ENV LANG=${CLOCALE}
ENV LANGUAGE=${CLOCALE}
RUN sed -i "/${CLOCALE}/s/^#\s//g" /etc/locale.gen
RUN locale-gen
RUN update-locale

#################################
# DEV TOOLCHAIN & CONFIGURATION #
#################################

RUN apt install -y kakoune wget git zip unzip

RUN git config --global user.email "${GITEMAIL}"
RUN git config --global user.name "${GITNAME}"

# Install SBT
RUN apt install apt-transport-https curl gnupg -yqq
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | gpg --no-default-keyring --keyring gnupg-ring:/etc/apt/trusted.gpg.d/scalasbt-release.gpg --import
RUN chmod 644 /etc/apt/trusted.gpg.d/scalasbt-release.gpg
RUN apt update
RUN apt install sbt

RUN sbt --version

###############
# APT CLEANUP #
###############

RUN if [ "$CENV" != "development" ]; then apt clean -y && apt autoclean -y && apt autoremove -y && apt purge -y; fi
