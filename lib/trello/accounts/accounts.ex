defmodule Trello.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Trello.Repo

  alias Trello.Accounts.User
  alias Comeonin.Bcrypt

  @doc """
  Authenticates an account

  ## Examples

      iex> list_accounts()
      [%User{}, ...]

  """
  def authenticate_account(email, plain_text_password) do
    query = from(u in User, where: u.email == ^email)

    case Repo.one(query) do
      nil ->
        Bcrypt.dummy_checkpw()
        {:error, :invalid_credentials}

      user ->
        if Bcrypt.checkpw(plain_text_password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, :invalid_credentials}
        end
    end
  end

  @doc """
  Returns the list of accounts.

  ## Examples

      iex> list_accounts()
      [%User{}, ...]

  """
  def list_accounts do
    Repo.all(User)
  end

  @doc """
  Gets a single account.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_account!(123)
      %User{}

      iex> get_account!(456)
      ** (Ecto.NoResultsError)

  """
  def get_account!(id), do: Repo.get!(User, id)

  @doc """
  Creates a account.

  ## Examples

      iex> create_account(%{field: value})
      {:ok, %User{}}

      iex> create_account(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_account(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a account.

  ## Examples

      iex> update_account(account, %{field: new_value})
      {:ok, %User{}}

      iex> update_account(account, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_account(%User{} = account, attrs) do
    account
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_account(account)
      {:ok, %User{}}

      iex> delete_account(account)
      {:error, %Ecto.Changeset{}}

  """
  def delete_account(%User{} = account) do
    Repo.delete(account)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking account changes.

  ## Examples

      iex> change_account(account)
      %Ecto.Changeset{source: %User{}}

  """
  def change_account(%User{} = account) do
    User.changeset(account, %{})
  end
end
