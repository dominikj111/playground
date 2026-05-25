defmodule MyappWeb.AdminHTML do
  @moduledoc """
  This module contains pages rendered by AdminController.
  """
  use MyappWeb, :html

  embed_templates "admin_html/*"
end
