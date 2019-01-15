defmodule TrelloWeb.UserChannel do
  use TrelloWeb, :channel

  def join("users:" <> user_id, _payload, socket) do
    current_user = socket.assigns.current_user

    if String.to_integer(user_id) == current_user.id do
      {:ok, socket}
    else
      {:error, %{reason: "Invalid user"}}
    end
  end
end
