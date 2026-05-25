defmodule MyappWeb.AdminController do
  use MyappWeb, :controller

  def index(conn, _params) do
    # Example: Check user permissions here
    # user = conn.assigns.current_user
    # if user.role == :admin do
    #   render(conn, :index)
    # else
    #   conn
    #   |> put_flash(:error, "Access denied")
    #   |> redirect(to: ~p"/")
    # end

    render(conn, :index)
  end
end
