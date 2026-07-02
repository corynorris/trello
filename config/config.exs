import Config

# General application configuration
config :trello, ecto_repos: [Trello.Repo]

# Configures the endpoint
config :trello, TrelloWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: TrelloWeb.ErrorView, accepts: ~w(html json)],
  pubsub_server: Trello.PubSub

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :trello, TrelloWeb.Guardian,
  issuer: "trello",
  secret_key: "secret"

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
