defmodule TrelloWeb.SessionView do
  use TrelloWeb, :view

  def render("forbidden.json", _data) do
    %{
      errors: %{
        email: ["Invalid username or password"],
        password: ["Invalid username or password"]
      }
    }
  end

  def render("jwt.json", %{user: user, jwt: token}) do
    %{
      user: %{
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      jwt: token
    }
  end
end
