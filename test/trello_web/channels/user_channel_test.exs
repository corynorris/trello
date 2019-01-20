defmodule TrelloWeb.UserChannelTest do
  use TrelloWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      socket(TrelloWeb.UserSocket, "user_id", %{some: :assign})
      |> subscribe_and_join(TrelloWeb.UserChannel, "user:lobby")

    {:ok, socket: socket}
  end
end
