defmodule TrelloWeb.UserController do
  use TrelloWeb, :controller

  alias Trello.Accounts
  alias Trello.Accounts.User
  alias Trello.Auth.Guardian

  action_fallback(TrelloWeb.FallbackController)

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_account(user_params),
         {:ok, token, _full_claims} = Guardian.encode_and_sign(user) do
      conn
      |> put_status(:created)
      |> render("jwt.json", user: user, jwt: token)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_account!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_account!(id)

    with {:ok, %User{} = user} <- Accounts.update_account(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end
end
