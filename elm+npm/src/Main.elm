module Main exposing (main)

import Browser
import Html exposing (Html)


type alias Model =
    {}


type alias Msg =
    Never


update : Msg -> Model -> Model
update msg _ =
    never msg


view : Model -> Html Msg
view _ =
    Html.h1 [] [ Html.text "Hello, World!" ]


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
