defmodule TrelloWeb.SignUpController do
  use TrelloWeb, :controller

  alias Trello.Accounts.Users
  alias Trello.Accounts.User

  alias TrelloWeb.Guardian

  action_fallback(TrelloWeb.FallbackController)

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create(user_params),
         {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user) do
      conn
      |> put_status(:created)
      |> put_view(TrelloWeb.UserView)
      |> render("show.json", user: user, token: jwt)
    end
  end
end
