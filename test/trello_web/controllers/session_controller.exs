defmodule TrelloWeb.SessionControllerTest do
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
    Map.drop(user, [:password])
  end

  describe "create/2" do
    test "Returns a user and JWT on sign in", %{conn: conn} do
      existing_user = fixture(:user)
      credentials = Map.take(@create_attrs, [:email, :password])
      conn = post(conn, Routes.session_path(conn, :create), credentials: credentials)
      assert %{"token" => jwt, "user" => user} = json_response(conn, 200)
      assert jwt != nil
      assert user != existing_user
    end

    test "Returns errors when the sign in credentials are incorrect", %{conn: conn} do
      conn = post(conn, Routes.session_path(conn, :create))
      assert %{"user" => user} = json_response(conn, 200)
      assert user == nil
    end
  end
end
