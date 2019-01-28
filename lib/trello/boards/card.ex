defmodule Trello.Boards.Card do
  use Ecto.Schema
  import Ecto.Changeset
  alias Trello.Boards.List

  @required_fields ~w(name list_id)a
  @derive {Jason.Encoder, only: [:name, :position, :list_id]}

  schema "cards" do
    field(:name, :string)
    field(:position, :integer)
    belongs_to(:list, List)

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
