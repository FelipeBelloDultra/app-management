FROM node:20-slim as Development

RUN apt update -y && \
  apt install openssl -y

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]
