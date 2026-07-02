import Config

# Note: This file is loaded before runtime.exs.
# Runtime-dependent values (SECRET_KEY_BASE, DATABASE_URL, SECRET_KEY)
# should be set in config/runtime.exs

config :trello, TrelloWeb.Endpoint,
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true

# Do not print debug messages in production
config :logger, level: :info

config :trello, Trello.Repo,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
