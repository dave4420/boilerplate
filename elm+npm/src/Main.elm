module Main exposing (main)

import Browser
import View.Page.HomePage as HomePage


type alias Flags =
    ()


type alias Model =
    {}


type alias Msg =
    Never


update : Msg -> Model -> ( Model, Cmd Msg )
update msg _ =
    never msg


view : Model -> Browser.Document Msg
view _ =
    HomePage.view


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( {}, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- DAVE: fake signin/signout


main : Program Flags Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
