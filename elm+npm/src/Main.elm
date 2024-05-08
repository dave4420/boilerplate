port module Main exposing (main)

import Browser
import Op.Cause as Cause exposing (Causes)
import Op.Effect as Effect exposing (Effects)
import View.Page.HomePage as HomePage


port signIn : Effect.SignInParams -> Cmd m


port signOut : () -> Cmd m


port demandName : String -> Cmd m


effectPorts : Effect.Ports Msg
effectPorts =
    { auth =
        { signIn = signIn
        , signOut = signOut ()
        , demandName = demandName
        }
    }


port signedIn : (Cause.SignedInParams -> m) -> Sub m


port failedToSignIn : (() -> m) -> Sub m


port signedOut : (() -> m) -> Sub m


port receiveName : (String -> m) -> Sub m


causePorts : Cause.Ports Msg
causePorts =
    { auth =
        { signedIn = signedIn
        , failedToSignIn = failedToSignIn
        , signedOut = signedOut
        , receivedName = receiveName
        }
    }


type alias Flags =
    ()


type alias Model =
    { name : String
    , effectConfig : Effect.Config
    }


type Msg
    = SetName String


update : Msg -> Model -> ( Model, Effects Msg )
update msg model =
    case msg of
        SetName newName ->
            ( { model | name = newName }
            , []
            )


view : Model -> Browser.Document Msg
view model =
    HomePage.view { name = model.name }


init : Flags -> ( Model, Effects Msg )
init _ =
    ( { name = "World"
      , effectConfig = {}
      }
    , Effect.demandName "Bob"
    )


subscriptions : Model -> Causes Msg
subscriptions _ =
    Cause.receivedName SetName


publishEffects : ( Model, Effects Msg ) -> ( Model, Cmd Msg )
publishEffects ( model, effects ) =
    ( model, Effect.toCmd effectPorts model.effectConfig effects )


publishCauses : Causes Msg -> Sub Msg
publishCauses causes =
    Cause.toSub causePorts causes


main : Program Flags Model Msg
main =
    Browser.document
        { init = \flags -> init flags |> publishEffects
        , update = \msg model -> update msg model |> publishEffects
        , view = view
        , subscriptions = \model -> subscriptions model |> publishCauses
        }
