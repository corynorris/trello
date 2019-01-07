defmodule TrelloWeb.Router do
  use TrelloWeb, :router

  # Our pipeline implements "maybe" authenticated. We'll use the `:ensure_auth` below for when we need to make sure someone is logged in.
  pipeline :auth do
    plug(Trello.Auth.Pipeline)
  end

  # We use ensure_auth to fail if there is no one logged in
  pipeline :ensure_auth do
    plug(Guardian.Plug.EnsureAuthenticated)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Trello.Auth.Pipeline)
  end

  scope "/", TrelloWeb do
    pipe_through(:browser)

    get("/*path", PageController, :index)
  end

  # Other scopes may use custom stacks.
  scope "/api", TrelloWeb do
    pipe_through(:api)

    scope "/v1" do
      post("/sign_up", UserController, :create)
      post("/sign_in", SessionController, :sign_in)
      resources("/users", UserController, except: [:new, :edit])
    end
  end
end
