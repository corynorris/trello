defmodule Trello.Accounts.Users do
  @moduledoc """
  The Accounts context.
  """
  alias Trello.Repo
  alias Trello.Accounts.User

  import Ecto.Query, warn: false

  def get_user!(id), do: Repo.get!(User, id)

  def create(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
