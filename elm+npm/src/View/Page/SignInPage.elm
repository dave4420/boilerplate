module View.Page.SignInPage exposing (Field, Params, State(..), view)

import Browser
import Html exposing (..)


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
    , body = [ text "DAVE" ]
    }
