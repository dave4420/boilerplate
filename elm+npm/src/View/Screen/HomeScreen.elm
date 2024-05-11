module View.Screen.HomeScreen exposing (Params, view)

import Browser
import Html exposing (..)
import Html.Attributes as Att
import Html.Events as Ev


type alias Params m =
    { name : String
    , onSignOut : m
    }


view : Params m -> Browser.Document m
view params =
    { title = "Home Page"
    , body =
        [ button
            [ Att.type_ "button"
            , Ev.onClick params.onSignOut
            ]
            [ text "Sign out"
            ]
        , h1 [] [ text <| "Hello, " ++ params.name ++ "!" ]
        ]
    }
