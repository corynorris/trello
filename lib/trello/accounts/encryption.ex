defmodule Trello.Accounts.Encryption do
  alias Bcrypt

  @spec password_hashing(binary()) :: any()
  def password_hashing(password),
    do: Bcrypt.Base.hash_password(password, Bcrypt.gen_salt(12, true))

  @spec validate_dummy() :: false
  def validate_dummy(), do: Bcrypt.no_user_verify()

  @spec validate_password(binary(), binary()) :: boolean()
  def validate_password(password, hash), do: Bcrypt.verify_pass(password, hash)

  @spec hash_password(nil | binary()) :: any()
  def hash_password(nil), do: nil
  def hash_password(password), do: Bcrypt.Base.hash_password(password, Bcrypt.gen_salt(12, true))
end
