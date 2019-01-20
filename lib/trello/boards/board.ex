defmodule Trello.Boards.Board do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(name user_id)a

  schema "boards" do
    field(:name, :string)
    field(:user_id, :id)

    timestamps()
  end

  @doc false
  def changeset(board, attrs) do
    board
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
