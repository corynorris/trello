defmodule Trello.BoardsTest do
  use Trello.DataCase

  alias Trello.Boards
  alias Trello.Accounts.Users

  describe "boards" do
    alias Trello.Boards.Board

    @valid_attrs %{name: "some name"}
    @invalid_attrs %{name: nil}
    @user_attrs %{
      email: "boardtest@123.com",
      first_name: "some first_name",
      last_name: "some last_name",
      password: "some password",
      password_confirmation: "some password"
    }

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@user_attrs)
        |> Users.create()

      user
    end

    def board_fixture(user, attrs) do
      {:ok, board} = Boards.create_user_board(user, attrs)
      board
    end

    test "list_boards/1 returns all boards for a specific user" do
      user = user_fixture()
      board = board_fixture(user, @valid_attrs)
      assert Boards.list_user_boards(user) == [board]
    end

    test "list_boards/1 returns nothing if no real user is passed" do
      user = user_fixture()
      user2 = user_fixture(%{email: "boardtest@1234.com"})
      board_fixture(user, @valid_attrs)
      assert Boards.list_user_boards(user2) == []
    end

    test "create_user_board/2 with valid data creates a board" do
      user = user_fixture()
      assert {:ok, %Board{} = board} = Boards.create_user_board(user, @valid_attrs)
      assert board.name == "some name"
    end

    test "create_user_board/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Boards.create_user_board(user, @invalid_attrs)
    end
  end
end
