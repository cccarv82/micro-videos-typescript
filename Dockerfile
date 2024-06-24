FROM node:20.14.0-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    gnupg2

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]