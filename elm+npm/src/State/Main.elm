module State.Main exposing
    ( Model
    , Msg
    , init
    , subscriptions
    , update
    , view
    )

import Browser
import Op.Cause as Cause exposing (Causes)
import Op.Effect as Effect exposing (Effects)
import View.Page.HomePage as HomePage


type alias Model =
    { name : String
    }


type Msg
    = SetName String


type alias UpdateContext m =
    { onMsg : Msg -> m
    }


update : UpdateContext m -> Msg -> Model -> ( Model, Effects m )
update context msg model =
    case msg of
        SetName newName ->
            ( { model | name = newName }
            , []
            )


type alias ViewContext m =
    { onMsg : Msg -> m
    }


view : ViewContext m -> Model -> Browser.Document m
view context model =
    HomePage.view { name = model.name }


init : ( Model, Effects m )
init =
    ( { name = "World" }
    , Effect.demandName "Bob"
    )


type alias SubscriptionContext m =
    { onMsg : Msg -> m
    }


subscriptions : SubscriptionContext m -> Model -> Causes m
subscriptions context model =
    Cause.receivedName (context.onMsg << SetName)
