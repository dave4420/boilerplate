module View.Page.HomePage exposing (view)

import Browser
import Html exposing (..)


view : Browser.Document m
view =
    { title = "Home Page"
    , body = [ h1 [] [ text "Hello, World!" ] ]
    }
