module Main exposing (main)

import Browser
import View.Page.HomePage as HomePage


type alias Flags =
    ()


type alias Model =
    { name : String
    }


type alias Msg =
    Never


update : Msg -> Model -> ( Model, Cmd Msg )
update msg _ =
    never msg


view : Model -> Browser.Document Msg
view model =
    HomePage.view { name = model.name }


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( { name = "World"
      }
    , Cmd.none
    )


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
