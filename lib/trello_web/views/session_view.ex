defmodule TrelloWeb.SessionView do
  use TrelloWeb, :view
  alias TrelloWeb.SessionView

  def render("forbiddon.json", %{error: error}) do
    %{
      data: %{
        error: error
      }
    }
  end

  def render("show.json", %{jwt: jwt, user: user}) do
    %{data: render_one(user, SessionView, "user.json")}
  end

  def render("user.json", %{jwt: jwt, user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      jwt: jwt
    }
  end
end
