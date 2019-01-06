defmodule TrelloWeb.SessionController do
  use TrelloWeb, :controller

  alias Trello.Auth.Guardian

  alias Trello.Accounts

  def login(conn, %{"user" => %{"username" => username, "password" => password}}) do
    Accounts.authenticate_account(username, password)
    |> login_reply(conn)
  end

  def logout(conn, _) do
    conn
    |> Guardian.Plug.sign_out()
    |> redirect(to: "/login")
  end

  defp login_reply({:ok, user}, conn) do
    conn
    |> Guardian.Plug.sign_in(user)
    |> put_status(:created)
    |> render("show.json", user: user)
  end

  defp login_reply({:error, reason}, conn) do
    conn
    |> put_status(:forbidden)
    |> render(
      Trello.SessionView,
      "forbidden.json",
      error: "Not Authenticated",
      reason: to_string(reason)
    )
  end
end
