# Multi-stage Docker build for Trello (Elixir/Phoenix + Preact SPA)
# Follows demos repo Dockerfile.video pattern

FROM hexpm/elixir:1.17.3-erlang-27.1-alpine-3.20.3 AS builder

RUN mix local.hex --force && mix local.rebar --force
WORKDIR /app
COPY mix.exs mix.lock ./
RUN mix deps.get
COPY config/ config/
COPY lib/ lib/
COPY priv/ priv/

ARG SECRET_KEY_BASE=dummy-key-base-for-compile-only
ARG SECRET_KEY=dummy-secret-for-compile-only
ENV SECRET_KEY_BASE=${SECRET_KEY_BASE} \
    SECRET_KEY=${SECRET_KEY} \
    DATABASE_URL=ecto://dummy:dummy@localhost/trello

RUN MIX_ENV=prod mix compile

# Build frontend assets
FROM node:22-alpine AS assets-builder
WORKDIR /app
COPY assets/package.json assets/package-lock.json ./
RUN npm ci --ignore-scripts
COPY assets/ ./
RUN npx webpack --mode production

FROM hexpm/elixir:1.17.3-erlang-27.1-alpine-3.20.3

RUN apk add --no-cache libstdc++ openssl ncurses-libs

WORKDIR /app
COPY --from=builder /app /app
COPY --from=builder /root/.mix /root/.mix
COPY --from=assets-builder /app/../priv/static /app/priv/static

EXPOSE 4000

ENV MIX_ENV=prod
ENV PORT=4000

CMD ["mix", "phx.server"]
