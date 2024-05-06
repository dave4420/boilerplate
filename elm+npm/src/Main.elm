module Main exposing (main)

import Browser
import Html exposing (Html)
import View.Page.HomePage as HomePage


type alias Model =
    {}


type alias Msg =
    Never


update : Msg -> Model -> Model
update msg _ =
    never msg


view : Model -> Html Msg
view _ =
    HomePage.view


init : Model
init =
    {}


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }
