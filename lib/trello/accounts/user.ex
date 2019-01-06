defmodule Trello.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(email first_name last_name password password_confirmation)a
  @optional_fields ~w(encrypted_password)a

  @email ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  schema "users" do
    field(:email, :string)
    field(:password, :string, virtual: true)
    field(:password_confirmation, :string, virtual: true)
    field(:encrypted_password, :string)
    field(:first_name, :string)
    field(:last_name, :string)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, @email)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already exists")
    |> put_encrypted_password()
  end

  def put_encrypted_password(%Ecto.Changeset{valid?: true, changes: %{password: password}} = cs) do
    put_change(cs, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
  end

  def put_encrypted_password(cs), do: cs
end
