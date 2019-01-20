defmodule Trello.Boards do
  @moduledoc """
  The Boards context.
  """

  import Ecto.Query, warn: false
  alias Trello.Repo

  alias Trello.Boards.Board

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
  def create_user_board(current_user, attrs \\ %{}) do
    current_user
    |> Ecto.build_assoc(:owned_boards)
    |> Board.changeset(attrs)
    |> Repo.insert()
  end
end
