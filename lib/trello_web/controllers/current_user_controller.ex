defmodule TrelloWeb.CurrentUserController do
  use TrelloWeb, :controller

  alias TrelloWeb.Guardian

  action_fallback(TrelloWeb.FallbackController)

  def show(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_view(TrelloWeb.UserView)
    |> render("show.json", user: user)
  end
end
