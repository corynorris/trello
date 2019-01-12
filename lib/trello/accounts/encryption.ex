defmodule Trello.Accounts.Encryption do
  alias Comeonin.Bcrypt

  @spec password_hashing(binary()) :: any()
  def password_hashing(password), do: Bcrypt.hashpwsalt(password)

  @spec validate_dummy() :: false
  def validate_dummy(), do: Bcrypt.dummy_checkpw()

  @spec validate_password(binary(), binary()) :: boolean()
  def validate_password(password, hash), do: Bcrypt.checkpw(password, hash)

  @spec hash_password(nil | binary()) :: any()
  def hash_password(nil), do: nil
  def hash_password(password), do: Comeonin.Bcrypt.hashpwsalt(password)
end
