defmodule TrelloWeb.BoardController do
  use TrelloWeb, :controller

  alias Trello.Boards
  alias Trello.Boards.Board

  plug(Guardian.Plug.EnsureAuthenticated)
  action_fallback(TrelloWeb.FallbackController)

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    owned_boards = Boards.list_user_boards(current_user)
    render(conn, "index.json", boards: owned_boards)
  end

  def create(conn, %{"board" => board_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    with {:ok, %Board{} = board} <- Boards.create_user_board(current_user, board_params) do
      conn
      |> put_status(:created)
      |> render("show.json", board: board)
    end
  end
end
