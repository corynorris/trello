import Config

if config_env() == :prod do
  database_url =
    System.get_env("DATABASE_URL") ||
      raise """
      environment variable DATABASE_URL is missing.
      For example: ecto://USER:PASS@HOST/DATABASE
      """

  maybe_ipv6 = if System.get_env("ECTO_IPV6") in ~w(true 1), do: [:inet6], else: []

  config :trello, Trello.Repo,
    url: database_url,
    pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
    socket_options: maybe_ipv6

  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """

  port = String.to_integer(System.get_env("PORT") || "4000")

  config :trello, TrelloWeb.Endpoint,
    http: [:inet6, port: port],
    url: [host: System.get_env("HOST") || "localhost", port: port],
    secret_key_base: secret_key_base

  config :trello, TrelloWeb.Guardian,
    issuer: "trello",
    secret_key:
      System.get_env("SECRET_KEY") ||
        raise """
        environment variable SECRET_KEY is missing.
        Generate a random 32+ character string.
        """
end
