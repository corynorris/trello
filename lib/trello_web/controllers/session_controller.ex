defmodule TrelloWeb.SessionController do
  use TrelloWeb, :controller

  alias Trello.Accounts.Auth
  alias TrelloWeb.Guardian

  action_fallback(TrelloWeb.FallbackController)

  def create(conn, %{"credentials" => credentials}) do
    case Auth.sign_in(credentials) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign()

        conn
        |> put_view(TrelloWeb.UserView)
        |> render("show.json", token: jwt, user: user)

      {:error, :invalid_credentials} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(TrelloWeb.UserView)
        |> render("error.json", message: :invalid_credentials)

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:forbidden)
    |> put_view(TrelloWeb.UserView)
    |> render("error.json", message: "Not Authenticated")
  end
end
