module State.SignIn exposing
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
import View.Screen.SignInScreen as SignIn


type Model
    = Model Fields


type alias Fields =
    { emailAddress : String
    , password : String
    , state : State
    }


type State
    = Pristine
    | Checking
    | Failed


type Msg
    = SetEmailAddress String
    | SetPassword String
    | SignInRequested
    | FailedToSignIn


update : Msg -> Model -> ( Model, Effects m )
update msg (Model fields) =
    case msg of
        SetEmailAddress newEmailAddress ->
            ( Model { fields | emailAddress = newEmailAddress }
            , []
            )

        SetPassword newPassword ->
            ( Model { fields | password = newPassword }
            , []
            )

        SignInRequested ->
            ( Model { fields | state = Checking }
            , Effect.signIn
                { emailAddress = fields.emailAddress
                , password = fields.password
                }
            )

        FailedToSignIn ->
            ( Model { fields | state = Failed }
            , []
            )


type alias ViewContext m =
    { onMsg : Msg -> m
    }


view : ViewContext m -> Model -> Browser.Document m
view { onMsg } (Model fields) =
    SignIn.view
        { emailAddress =
            { value = fields.emailAddress
            , onChange = onMsg << SetEmailAddress
            }
        , password =
            { value = fields.password
            , onChange = onMsg << SetPassword
            }
        , state =
            case fields.state of
                Pristine ->
                    SignIn.Pristine

                Checking ->
                    SignIn.Checking

                Failed ->
                    SignIn.Failed "E-mail address or password is wrong"
        , onCheck = onMsg SignInRequested
        }


init : Model
init =
    Model
        { emailAddress = ""
        , password = ""
        , state = Pristine
        }


type alias SubscriptionContext m =
    { onMsg : Msg -> m
    }


subscriptions : SubscriptionContext m -> Model -> Causes m
subscriptions { onMsg } (Model fields) =
    case fields.state of
        Checking ->
            Cause.failedToSignIn (onMsg FailedToSignIn)

        _ ->
            []
