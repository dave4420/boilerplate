module Main exposing (main)

import Browser
import Op.Cause as Cause exposing (Causes)
import Op.Effect as Effect exposing (Effects)
import Ports
import State.Main as Main


type alias Flags =
    ()


type alias Model =
    { main : Main.Model
    , effectConfig : Effect.Config
    }


type alias Msg =
    Main.Msg


update : Msg -> Model -> ( Model, Effects Msg )
update msg model =
    let
        ( newMain, effects ) =
            Main.update { onMsg = identity } msg model.main
    in
    ( { model | main = newMain }
    , effects
    )


view : Model -> Browser.Document Msg
view model =
    Main.view { onMsg = identity } model.main


init : Flags -> ( Model, Effects Msg )
init _ =
    let
        ( newMain, effects ) =
            Main.init
    in
    ( { main = newMain
      , effectConfig = {}
      }
    , effects
    )


subscriptions : Model -> Causes Msg
subscriptions model =
    Main.subscriptions { onMsg = identity } model.main


publishEffects : ( Model, Effects Msg ) -> ( Model, Cmd Msg )
publishEffects ( model, effects ) =
    ( model, Effect.toCmd Ports.effectPorts model.effectConfig effects )


publishCauses : Causes Msg -> Sub Msg
publishCauses causes =
    Cause.toSub Ports.causePorts causes


main : Program Flags Model Msg
main =
    Browser.document
        { init = \flags -> init flags |> publishEffects
        , update = \msg model -> update msg model |> publishEffects
        , view = view
        , subscriptions = \model -> subscriptions model |> publishCauses
        }
