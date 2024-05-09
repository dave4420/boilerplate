module View.Page.SignInPage exposing (Field, Params, State(..), view)

import Browser
import Html exposing (..)
import Html.Attributes as Att
import Html.Events as Ev


type alias Params m =
    { emailAddress : Field m
    , password : Field m
    , state : State
    , onCheck : m
    }


type alias Field m =
    { value : String
    , onChange : String -> m
    }


type State
    = Pristine
    | Checking
    | Failed String


view : Params m -> Browser.Document m
view params =
    { title = "Sign In"
    , body =
        [ h1 [] [ text "Sign In" ]
        , form []
            [ viewField "E-mail address" "text" params.emailAddress
            , viewField "Password" "password" params.emailAddress
            ]
        ]
    }


viewField : String -> String -> Field m -> Html m
viewField label type_ field =
    p []
        [ text <| label ++ " "
        , input
            [ Att.type_ type_
            , Att.value field.value
            , Ev.onInput field.onChange
            ]
            []
        ]
