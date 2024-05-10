module State.Main exposing
    ( Model
    , Msg
    , init
    , subscriptions
    , update
    , view
    )

import Browser
import Domain.ActiveUser as ActiveUser exposing (ActiveUser)
import Op.Cause as Cause exposing (Causes)
import Op.Effect exposing (Effects)
import State.App as App
import State.SignIn as SignIn


type Model
    = Outside SignIn.Model
    | Inside InsideFields


type alias InsideFields =
    { app : App.Model
    , user : ActiveUser
    }


type Msg
    = SignInMsg SignIn.Msg
    | AppMsg App.Msg
    | ReceivedIdToken ActiveUser
    | SignedOut


type alias UpdateContext m =
    { onMsg : Msg -> m
    }


update : UpdateContext m -> Msg -> Model -> ( Model, Effects m )
update _ msg model =
    case msg of
        SignInMsg m ->
            case model of
                Outside signIn ->
                    let
                        ( newSignIn, effects ) =
                            SignIn.update m signIn
                    in
                    ( Outside newSignIn
                    , effects
                    )

                _ ->
                    ( model, [] )

        AppMsg m ->
            case model of
                Inside fields ->
                    let
                        ( newApp, effects ) =
                            App.update m fields.app
                    in
                    ( Inside { fields | app = newApp }
                    , effects
                    )

                _ ->
                    ( model, [] )

        ReceivedIdToken user ->
            let
                newApp =
                    App.init
            in
            case model of
                Outside _ ->
                    ( Inside
                        { app = newApp
                        , user = user
                        }
                    , []
                    )

                Inside fields ->
                    ( Inside { fields | user = user }
                    , []
                    )

        SignedOut ->
            ( Outside SignIn.init
            , []
            )


type alias ViewContext m =
    { onMsg : Msg -> m
    }


view : ViewContext m -> Model -> Browser.Document m
view context model =
    case model of
        Outside signIn ->
            SignIn.view
                { onMsg = context.onMsg << SignInMsg
                }
                signIn

        Inside fields ->
            App.view
                { name = ActiveUser.forename fields.user
                }
                fields.app


init : ( Model, Effects m )
init =
    ( Outside SignIn.init
    , []
    )


type alias SubscriptionContext m =
    { onMsg : Msg -> m
    }


subscriptions : SubscriptionContext m -> Model -> Causes m
subscriptions { onMsg } model =
    let
        fromBelow =
            case model of
                Outside signIn ->
                    SignIn.subscriptions
                        { onMsg = onMsg << SignInMsg
                        }
                        signIn

                Inside fields ->
                    App.subscriptions
                        { onMsg = onMsg << AppMsg }
                        fields.app
    in
    Cause.receivedIdToken (onMsg << ReceivedIdToken)
        ++ Cause.signedOut (onMsg SignedOut)
        ++ fromBelow
