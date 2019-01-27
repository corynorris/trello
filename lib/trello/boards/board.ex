defmodule Trello.Boards.Board do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(name user_id)a
  @derive {Jason.Encoder, only: [:name, :lists]}

  schema "boards" do
    field(:name, :string)
    field(:user_id, :id)

    has_many(:lists, Trello.Boards.List)

    timestamps()
  end

  @doc false
  def changeset(board, attrs) do
    board
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
