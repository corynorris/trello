# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :trello, ecto_repos: [Trello.Repo]

# Configures the endpoint
config :trello, TrelloWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "yqSXlUUHQ0SN4cqmm/Kd2+MJ0PLKlAQRKR+szpeqRnMKtdnOs01HuJjAutwYF1U8",
  render_errors: [view: TrelloWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Trello.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :trello, Trello.Auth.Guardian,
  issuer: "trello",
  secret_key: "secret"

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
