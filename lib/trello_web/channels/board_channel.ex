defmodule TrelloWeb.BoardChannel do
  use TrelloWeb, :channel

  alias Trello.Boards

  def join("boards:" <> board_id, _payload, socket) do
    current_user = socket.assigns.current_user
    board = Boards.get_user_board(current_user, board_id)
    {:ok, %{board: board}, assign(socket, :board, board)}
  end

  def handle_in("lists:create", %{"list" => list_params}, socket) do
    socket.assigns.board
    |> Boards.create_list(list_params)
    |> case do
      {:ok, list} ->
        broadcast!(socket, "list:created", %{list: list})
        {:noreply, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{error: "Error creating list"}}, socket}
    end
  end

  def handle_in("lists:update", %{"list" => list_params}, socket) do
    list_params["id"]
    |> Boards.get_list!()
    |> IO.inspect()
    |> Boards.update_list(list_params)
    |> case do
      {:ok, list} ->
        broadcast!(socket, "list:updated", %{list: list})
        {:noreply, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{error: "Error creating list"}}, socket}
    end
  end
end
