#
# ---- Base ----
#
FROM node:14-alpine AS base
RUN apk add --no-cache make gcc g++ python

#
# ---- Dependencies ----
#
FROM base AS dependencies
WORKDIR /usr/src/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --production --silent

#
# ---- Build ----
#
FROM base as build
WORKDIR /usr/src/app
COPY ./ .
COPY ./.env .

RUN yarn add react-scripts --dev && yarn build

#
# ---- Release ----
#
FROM dependencies AS release
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build .
RUN yarn global add serve

CMD ["sh", "-c", "serve -p 3000"]
