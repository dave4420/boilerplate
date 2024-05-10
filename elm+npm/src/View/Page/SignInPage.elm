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
        , form [] <|
            viewField "E-mail address" "email" params.emailAddress
                ++ viewField "Password" "password" params.emailAddress
                ++ viewButton params
                ++ viewError params.state
        ]
    }


viewField : String -> String -> Field m -> List (Html m)
viewField label type_ field =
    [ p []
        [ text <| label ++ " "
        , input
            [ Att.type_ type_
            , Att.value field.value
            , Ev.onInput field.onChange
            ]
            []
        ]
    ]


viewButton : Params m -> List (Html m)
viewButton params =
    let
        disabled =
            case params.state of
                Checking ->
                    True

                _ ->
                    False
    in
    [ p []
        [ button
            [ Att.type_ "button"
            , Att.disabled disabled
            , Ev.onClick params.onCheck
            ]
            [ text "Sign in"
            ]
        ]
    ]


viewError : State -> List (Html m)
viewError state =
    case state of
        Failed errorMessage ->
            [ p []
                [ b [] [ text errorMessage ] ]
            ]

        _ ->
            []
