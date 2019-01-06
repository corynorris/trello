defmodule TrelloWeb.UserView do
  use TrelloWeb, :view
  alias TrelloWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user, jwt: token}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      jwt: token
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
