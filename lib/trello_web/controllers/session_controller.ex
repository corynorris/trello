defmodule TrelloWeb.SessionController do
  use TrelloWeb, :controller

  alias Trello.Auth.Guardian

  alias Trello.Accounts

  def sign_in(conn, %{"session" => %{"email" => email, "password" => password}}) do
    Accounts.authenticate_account(email, password)
    |> sign_in_reply(conn)
  end

  defp sign_in_reply({:ok, user}, conn) do
    {:ok, token, _full_claims} = Guardian.encode_and_sign(user)

    conn
    |> put_status(:created)
    |> render("jwt.json", user: user, jwt: token)
  end

  defp sign_in_reply({:error, reason}, conn) do
    conn
    |> put_status(:forbidden)
    |> render(
      "forbidden.json",
      error: "Not Authenticated",
      reason: to_string(reason)
    )
  end
end
