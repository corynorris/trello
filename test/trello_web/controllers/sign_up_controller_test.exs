defmodule TrelloWeb.SignUpControllerTest do
  use TrelloWeb.ConnCase

  @create_attrs %{
    email: "test@123.com",
    first_name: "some first_name",
    last_name: "some last_name",
    password: "some password",
    password_confirmation: "some password"
  }

  @invalid_attrs %{
    email: nil,
    first_name: nil,
    last_name: nil,
    password: nil,
    password_confirmation: nil
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create/2" do
    test "Creates a user and responds with the user and a JWT", %{conn: conn} do
      conn = post(conn, Routes.sign_up_path(conn, :create), user: @create_attrs)
      assert %{"token" => _id, "user" => _user} = json_response(conn, 201)
    end

    test "Returns an error and does not create a user if attributes are invalid", %{conn: conn} do
      conn = post(conn, Routes.sign_up_path(conn, :create), user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
