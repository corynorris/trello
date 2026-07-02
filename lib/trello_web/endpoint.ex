defmodule TrelloWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :trello

  socket(
    "/socket",
    TrelloWeb.UserSocket,
    websocket: [timeout: 45_000],
    longpoll: false
  )

  # Serve at "/" the static files from "priv/static" directory.
  plug(
    Plug.Static,
    at: "/",
    from: :trello,
    gzip: false,
    only: TrelloWeb.static_paths()
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug(Phoenix.CodeReloader)
    plug(Phoenix.LiveDashboard.RequestLogger,
      param_key: "request_logger",
      cookie_key: "request_logger"
    )
  end

  plug(Plug.RequestId)
  plug(Plug.Telemetry, event_prefix: [:phoenix, :endpoint])

  plug(
    Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug(
    Plug.Session,
    store: :cookie,
    key: "_trello_key",
    signing_salt: "tkX1I6Kw"
  )

  plug(TrelloWeb.Router)
end
