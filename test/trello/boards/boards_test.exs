defmodule Trello.BoardsTest do
  use Trello.DataCase

  alias Trello.Boards
  alias Trello.Accounts.Users

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

  describe "lists" do
    alias Trello.Boards.List

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def list_fixture(attrs \\ %{}) do
      {:ok, list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Boards.create_list()

      list
    end

    test "list_lists_for_board/1 returns all lists" do
      list = list_fixture()
      assert Boards.list_lists() == [list]
    end

    test "create_list_for_board/2 with valid data creates a list" do
      assert {:ok, %List{} = list} = Boards.create_list(@valid_attrs)
      assert list.name == "some name"
    end

    test "create_list_for_board/2 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Boards.create_list(@invalid_attrs)
    end

    test "update_list/2 with valid data updates the list" do
      list = list_fixture()
      assert {:ok, %List{} = list} = Boards.update_list(list, @update_attrs)
      assert list.name == "some updated name"
    end

    test "update_list/2 with invalid data returns error changeset" do
      list = list_fixture()
      assert {:error, %Ecto.Changeset{}} = Boards.update_list(list, @invalid_attrs)
      assert list == Boards.get_list!(list.id)
    end
  end

  describe "cards" do
    alias Trello.Boards.Card

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Boards.create_card()

      card
    end

    test "create_card_for_list/2 with valid data creates a card" do
      assert {:ok, %Card{} = card} = Boards.create_card(@valid_attrs)
      assert card.name == "some name"
    end

    test "create_card_for_list/2 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Boards.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, %Card{} = card} = Boards.update_card(card, @update_attrs)
      assert card.name == "some updated name"
    end

    test "update_card/2 with invalid data returns error changeset" do
      card = card_fixture()
      assert {:error, %Ecto.Changeset{}} = Boards.update_card(card, @invalid_attrs)
      assert card == Boards.get_card!(card.id)
    end
  end
end
