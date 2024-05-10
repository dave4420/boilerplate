module State.App exposing (..)

import Browser
import Op.Cause exposing (Causes)
import Op.Effect as Effect exposing (Effects)
import View.Page.HomePage as HomePage


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


type alias ViewContext =
    { name : String
    }


view : ViewContext -> Model -> Browser.Document m
view context _ =
    -- DAVE: needs to include SignOut button
    HomePage.view { name = context.name }


init : Model
init =
    Model


type alias SubscriptionContext m =
    { onMsg : Msg -> m
    }


subscriptions : SubscriptionContext m -> Model -> Causes m
subscriptions _ _ =
    []
