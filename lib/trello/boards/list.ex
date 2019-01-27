defmodule Trello.Boards.List do
  use Ecto.Schema
  import Ecto.Changeset
  alias Trello.Boards.Board

  @required_fields ~w(name board_id)a
  @derive {Jason.Encoder, only: [:id, :name]}

  schema "lists" do
    field(:name, :string)
    belongs_to(:board, Board)

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
