defmodule TrelloWeb.Guardian.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :trello,
    error_handler: TrelloWeb.Guardian.ErrorHandler,
    module: TrelloWeb.Guardian

  plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
  plug(Guardian.Plug.LoadResource, allow_blank: true)
end
