defmodule Trello.Boards do
  @moduledoc """
  The Boards context.
  """

  import Ecto.Query, warn: false
  alias Trello.Repo

  alias Trello.Boards.Board
  alias Trello.Boards.List
  alias Trello.Boards.Card

  @doc """
  Returns the list of boards.

  ## Examples

      iex> list_user_boards(current_user)
      [%Board{}, ...]

  """
  def list_user_boards(current_user) do
    current_user
    |> Ecto.assoc(:owned_boards)
    |> Repo.all()
  end

  @doc """
  Creates a board.

  ## Examples

      iex> create_user_board(current_user, %{field: value})
      {:ok, %Board{}}

      iex> create_user_board(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def get_user_board(current_user, board_id) do
    current_user
    |> Ecto.assoc(:owned_boards)
    |> Repo.get!(board_id)
    |> Repo.preload([:lists])
    |> Repo.preload([:cards])
  end

  @doc """
  Creates a board.

  ## Examples

      iex> create_user_board(current_user, %{field: value})
      {:ok, %Board{}}

      iex> create_user_board(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_board(current_user, attrs \\ %{}) do
    current_user
    |> Ecto.build_assoc(:owned_boards)
    |> Board.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
    Gets a list by ID.
  """

  def get_list!(id), do: Repo.get!(List, id) |> Repo.preload(:cards)

  @doc """
  Creates a list.

  ## Examples

      iex> create_list(board, %{field: value})
      {:ok, %List{}}

      iex> create_list(board, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_list(board, attrs \\ %{}) do
    board
    |> Ecto.build_assoc(:lists)
    |> List.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a list.

  ## Examples

      iex> update_list(list, %{field: new_value})
      {:ok, %List{}}

      iex> update_list(list, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_list(%List{} = list, attrs) do
    list
    |> List.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Creates a card.

  ## Examples

      iex> create_card(list, %{field: value})
      {:ok, %Card{}}

      iex> create_card(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card(board, attrs \\ %{}) do
    board
    |> Ecto.assoc(:lists)
    |> Repo.get!(attrs["list_id"])
    |> Ecto.build_assoc(:cards)
    |> Card.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a card.

  ## Examples

      iex> update_card(card, %{field: new_value})
      {:ok, %Card{}}

      iex> update_card(card, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  @doc """
    Gets a list by ID.
  """

  def get_card!(id), do: Repo.get!(Card, id)
end
