defmodule TrelloWeb.BoardView do
  use TrelloWeb, :view
  alias TrelloWeb.{BoardView, FormatHelpers}

  def render("index.json", %{boards: boards}) do
    %{boards: render_many(boards, BoardView, "board.json")}
  end

  def render("show.json", %{board: board}) do
    %{board: render_one(board, BoardView, "board.json")}
  end

  def render("board.json", %{board: board}) do
    board
    |> Map.from_struct()
    |> Map.put(:inserted_at, NaiveDateTime.to_iso8601(board.inserted_at))
    |> Map.put(:updated_at, NaiveDateTime.to_iso8601(board.updated_at))
    |> Map.take([:id, :user_id, :name])
    |> FormatHelpers.camelize()
  end
end
