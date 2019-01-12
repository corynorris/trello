defmodule TrelloWeb.CurrentUserControllerTest do
  use TrelloWeb.ConnCase

  @create_attrs %{
    email: "test@123.com",
    first_name: "some first_name",
    last_name: "some last_name",
    password: "some password",
    password_confirmation: "some password"
  }

  def fixture(:user) do
    {:ok, user} = Trello.Accounts.Users.create(@create_attrs)
    user
  end

  def secure_conn(conn) do
    user = fixture(:user)
    {:ok, jwt, _} = user |> TrelloWeb.Guardian.encode_and_sign()

    conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", "Bearer " <> jwt)
  end

  describe "show/2" do
    test "Shows the current user if signed in", %{conn: conn} do
      conn = secure_conn(conn)
      conn = get(conn, Routes.current_user_path(conn, :show))
      assert %{"user" => user} = json_response(conn, 200)
      assert user != nil
    end

    test "Returns null if the user is not signed in", %{conn: conn} do
      conn = get(conn, Routes.current_user_path(conn, :show))
      assert %{"user" => user} = json_response(conn, 200)
      assert user == nil
    end
  end
end
