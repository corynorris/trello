defmodule TrelloWeb.BoardControllerTest do
  use TrelloWeb.ConnCase

  alias Trello.Boards

  @create_attrs %{
    name: "some name"
  }

  @invalid_attrs %{name: nil}

  @user_attrs %{
    email: "board_test@123.com",
    first_name: "some first_name",
    last_name: "some last_name",
    password: "some password",
    password_confirmation: "some password"
  }

  def fixture(:user) do
    {:ok, user} = Trello.Accounts.Users.create(@user_attrs)
    user
  end

  def fixture(:board, user) do
    {:ok, board} = Boards.create_user_board(user, @create_attrs)
    board
  end

  def secure_conn(conn, user) do
    {:ok, jwt, _} = user |> TrelloWeb.Guardian.encode_and_sign()

    conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", "Bearer " <> jwt)
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all boards for a given user", %{conn: conn} do
      user = fixture(:user)
      fixture(:board, user)
      conn = secure_conn(conn, user)
      conn = get(conn, Routes.board_path(conn, :index))

      assert [board] = json_response(conn, 200)["data"]

      assert board["userId"] == user.id
      assert board["name"] == "some name"
    end
  end

  describe "create board" do
    test "renders board when data is valid", %{conn: conn} do
      user = fixture(:user)
      conn = secure_conn(conn, user)
      conn = post(conn, Routes.board_path(conn, :create), board: @create_attrs)
      assert board = json_response(conn, 201)["data"]
      assert board["userId"] == user.id
      assert board["name"] == "some name"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.board_path(conn, :create), board: @invalid_attrs)
      assert json_response(conn, 401) == %{"error" => "unauthenticated"}
    end
  end
end
