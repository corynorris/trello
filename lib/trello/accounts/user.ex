defmodule Trello.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Trello.Accounts.Encryption

  @sign_up_fields ~w(email first_name last_name password password_confirmation)a
  @sign_in_fields ~w(email password)a

  @email ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  schema "users" do
    field(:email, :string)
    field(:password, :string)
    field(:password_confirmation, :string, virtual: true)
    field(:first_name, :string)
    field(:last_name, :string)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, @sign_up_fields)
    |> validate_required(@sign_up_fields)
    |> validate_format(:email, @email)
    |> update_change(:email, &String.downcase/1)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already exists")
    |> update_change(:password, &Encryption.hash_password/1)
  end

  def sign_in_changeset(user, attrs) do
    user
    |> cast(attrs, @sign_in_fields)
    |> validate_required(@sign_in_fields)
    |> validate_format(:email, @email)
    |> update_change(:email, &String.downcase/1)
  end
end
