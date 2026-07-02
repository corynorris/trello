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

  base_path = System.get_env("BASE_PATH") || ""

  # Public hostname the app is served from (behind Traefik/nginx TLS termination).
  # Used both for URL generation and, critically, for WebSocket origin checking:
  # Phoenix defaults check_origin to true in prod and compares the request Origin
  # against this host. It must be the real public domain, NOT the bind address.
  host =
    System.get_env("PHX_HOST") ||
      raise """
      environment variable PHX_HOST is missing.
      It must be the public hostname the app is served from, e.g. demos.corynorris.me
      """

  config :trello, TrelloWeb.Endpoint,
    http: [:inet6, port: port],
    url: [host: host, port: 443, scheme: "https", path: base_path],
    check_origin: ["https://#{host}", "http://#{host}"],
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
