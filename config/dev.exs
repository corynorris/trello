import Config

# Enable dev routes for dashboard
config :trello, dev_routes: true

# For development, we disable any cache and enable
# debugging and code reloading.
config :trello, TrelloWeb.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: [
      "node_modules/webpack/bin/webpack.js",
      "--mode",
      "development",
      "--watch-stdin",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

# Configure your database
config :trello, Trello.Repo,
  username: "postgres",
  password: "password",
  database: "trello_dev",
  hostname: "localhost",
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")
