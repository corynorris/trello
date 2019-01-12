defmodule TrelloWeb.UserView do
  use TrelloWeb, :view
  alias TrelloWeb.{UserView, FormatHelpers}

  def render("show.json", %{token: jwt, user: user}) do
    %{user: render_one(user, UserView, "user.json"), token: jwt}
  end

  def render("show.json", %{user: user}) do
    %{user: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    user
    |> Map.from_struct()
    |> Map.put(:inserted_at, NaiveDateTime.to_iso8601(user.inserted_at))
    |> Map.put(:updated_at, NaiveDateTime.to_iso8601(user.updated_at))
    |> Map.take([:id, :email, :first_name, :last_name, :inserted_at, :updated_at])
    |> FormatHelpers.camelize()
  end

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
