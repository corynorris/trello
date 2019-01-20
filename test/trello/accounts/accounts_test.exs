defmodule Trello.AccountsTest do
  use Trello.DataCase

  alias Trello.Accounts.{User, Users, Auth, Encryption}

  @valid_attrs %{
    email: "accountstest@123.com",
    first_name: "some first_name",
    last_name: "some last_name",
    password: "some password",
    password_confirmation: "some password"
  }

  @invalid_attrs %{
    email: nil,
    first_name: nil,
    last_name: nil,
    password: nil,
    password_confirmation: nil
  }

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(@valid_attrs)
      |> Users.create()

    user
  end

  describe "auth" do
    test "sign_up/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create(@valid_attrs)
      assert user.email == "accountstest@123.com"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert Encryption.validate_password("some password", user.password)
    end

    test "sign_up/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create(@invalid_attrs)
    end

    test "sign_in/2 with valid data returns a user" do
      user_fixture()
      assert {:ok, %User{} = user} = Auth.sign_in(@valid_attrs)
      assert user.email == "accountstest@123.com"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert Encryption.validate_password("some password", user.password)
    end

    test "sign_in/2 with mismatched password returns invalid credentials" do
      user_fixture()

      assert {:error, :invalid_credentials} =
               Auth.sign_in(%{email: "bad@email.com", password: "badpassword"})
    end

    test "sign_in/2 with invalid data returns invalid credentials" do
      assert {:error, :invalid_credentials} = Auth.sign_in(@valid_attrs)
    end
  end

  describe "users" do
    test "get_user!/1 returns the user with given id" do
      user = user_fixture()

      assert user = Users.get_user!(user.id)
      assert user.email == "accountstest@123.com"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert Encryption.validate_password("some password", user.password)
    end
  end
end
