defmodule Trello.Accounts.Encryption do
  @spec hash_password(nil | binary()) :: any()
  def hash_password(nil), do: nil
  def hash_password(password), do: Bcrypt.hash_pwd_salt(password)

  @spec validate_dummy() :: false
  def validate_dummy(), do: Bcrypt.no_user_verify()

  @spec validate_password(binary(), binary()) :: boolean()
  def validate_password(password, hash), do: Bcrypt.verify_pass(password, hash)
end
