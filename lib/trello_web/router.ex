defmodule TrelloWeb.Router do
  use TrelloWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(TrelloWeb.Guardian.Pipeline)
  end

  # Other scopes may use custom stacks.
  scope "/api", TrelloWeb do
    pipe_through(:api)

    scope "/v1" do
      post("/sign_up", SignUpController, :create)
      post("/sign_in", SessionController, :create)
      get("/current_user", CurrentUserController, :show)
      resources("/boards", BoardController, only: [:index, :create])
    end
  end

  scope "/", TrelloWeb do
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end
end
