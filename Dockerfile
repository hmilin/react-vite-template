FROM node:18-alpine as builder

WORKDIR /usr/share/web
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
  pnpm install --no-optional

COPY . .
RUN pnpm build

FROM nginx:1.23.3

WORKDIR /usr/share/web

# Redirect standard output and error stream
RUN mkdir -p logs && \
  ln -s /dev/stdout logs/access.log && \
  ln -s /dev/stderr logs/error.log

COPY nginx/startup.sh .
COPY nginx/conf/ conf/
COPY --from=builder dist/ html/


ENV CONTAINERIZED true

EXPOSE 80
# Run Command
CMD sh startup.sh
