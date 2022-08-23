###################################################################
# Stage 1: Install the dependencies                               #
###################################################################

ARG NODE_VERSION=18.6
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS dependencies
RUN apk update
RUN apk add --no-cache rsync

WORKDIR /workspace-install

COPY ../../yarn.lock ../../.yarnrc.yml ./
COPY ../../.yarn/ ./.yarn/

RUN --mount=type=bind,target=/docker-context \
  rsync -amv --delete \
    --exclude="node_modules" \
    --exclude="**/node_modules" \
    --include=".yarn/*" \
    --include="package.json" \
    --include="turbo.json" \
    --include="*/" --exclude="*" \
    /docker-context/ /workspace-install/;

RUN yarn install --immutable --inline-builds

###################################################################
# Stage 2: Build the app                                          #
###################################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY . .
COPY --from=dependencies /workspace-install ./

#RUN yarn workspaces foreach -pvitR --from '@kasey-turbo/web' run build
#RUN yarn workspaces focus @kasey-turbo/web --production # This only install regular dependencies by omitting dev dependencies
RUN yarn turbo prune --scope=@kasey-turbo/web --docker


#FROM node:alpine AS builder
#RUN apk update
## Set working directory
#WORKDIR /app
#COPY . .
#RUN yarn turbo prune --scope=@kasey-turbo/web --docker

# Add lockfile and package.json's of isolated subworkspace
#FROM node:alpine AS installer
#RUN apk update
## Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
#
#COPY --from=dependencies /workspace-install ./
#
#WORKDIR /app
#COPY --from=builder /app/out/json/ .
#COPY --from=builder /app/out/yarn.lock ./yarn.lock
#COPY --from=builder /app/out/full/ .
##COPY turbo.json turbo.json
#
#RUN yarn turbo run build --scope=@kasey-turbo/web
#
####################################################################
## Stage 3: Start the app                                          #
####################################################################
#
#FROM nginx:alpine AS start
#
#ENV NODE_ENV=production
#
#WORKDIR /app
#
## Don't run production as root
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs
#USER nextjs
#
#COPY --from=installer /app/apps/web/next.config.js .
#COPY --from=installer /app/apps/web/package.json .
#
## Automatically leverage output traces to reduce image size
## https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
#COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
#
#CMD node apps/web/server.js
