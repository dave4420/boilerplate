module View.Page.HomePage exposing (view)

import Browser
import Html exposing (..)


type alias Params =
    { name : String }


view : Params -> Browser.Document m
view params =
    { title = "Home Page"
    , body = [ h1 [] [ text <| "Hello, " ++ params.name ++ "!" ] ]
    }
