module State.App exposing (..)

import Browser
import Op.Cause exposing (Causes)
import Op.Effect as Effect exposing (Effects)
import View.Screen.HomeScreen as HomeScreen


type Model
    = Model


type Msg
    = SignOut


update : Msg -> Model -> ( Model, Effects m )
update msg model =
    case msg of
        SignOut ->
            ( model
            , Effect.signOut
            )


type alias ViewContext m =
    { onMsg : Msg -> m
    , name : String
    }


view : ViewContext m -> Model -> Browser.Document m
view context _ =
    HomeScreen.view
        { name = context.name
        , onSignOut = context.onMsg SignOut
        }


init : Model
init =
    Model


type alias SubscriptionContext m =
    { onMsg : Msg -> m
    }


subscriptions : SubscriptionContext m -> Model -> Causes m
subscriptions _ _ =
    []
