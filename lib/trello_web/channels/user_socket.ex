defmodule TrelloWeb.UserSocket do
  use Phoenix.Socket
  alias TrelloWeb.Guardian
  ## Channels
  # channel "room:*", TrelloWeb.RoomChannel
  # Channels
  channel("users:*", TrelloWeb.UserChannel)
  channel("boards:*", TrelloWeb.BoardChannel)

  # def connect(%{"token" => token}, socket, _connect_info) do
  #   case Guardian.Phoenix.Socket.authenticate(socket, TrelloWeb.Guardian, token) do
  #     {:ok, authed_socket} ->
  #       {:ok, authed_socket}

  #     {:error, _} ->
  #       :error
  #   end
  # end

  # Alternate implementation
  def connect(%{"token" => token}, socket, _connect_info) do
    case Guardian.resource_from_token(token) do
      {:ok, user, _claims} ->
        {:ok, assign(socket, :current_user, user)}

      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     TrelloWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
