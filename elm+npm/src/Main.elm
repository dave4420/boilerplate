port module Main exposing (main)

import Browser
import View.Page.HomePage as HomePage


port demandName : String -> Cmd m


port receiveName : (String -> m) -> Sub m


type alias Flags =
    ()


type alias Model =
    { name : String
    }


type Msg
    = SetName String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName newName ->
            ( { model | name = newName }
            , Cmd.none
            )


view : Model -> Browser.Document Msg
view model =
    HomePage.view { name = model.name }


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( { name = "World"
      }
    , demandName "Bob"
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    receiveName SetName



-- DAVE: fake signin/signout


main : Program Flags Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
