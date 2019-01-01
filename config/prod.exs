use Mix.Config

config :trello, TrelloWeb.Endpoint,
  http: [:inet6, port: System.get_env("PORT")],
  url: [scheme: "https", host: "trello.corynorris.me", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: Map.fetch!(System.get_env(), "SECRET_KEY_BASE")

# Do not print debug messages in production
config :logger, level: :info

config :trello, Trello.Repo,
  url: System.get_env("DATABASE_URL"),
  pool_size: 15,
  ssl: true

# config :trello, Trello.Guardian,
#   issuer: "trello",
#   secret_key:  Map.fetch!(System.get_env(), "SECRET_KEY")
