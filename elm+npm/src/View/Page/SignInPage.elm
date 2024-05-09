module View.Page.SignInPage exposing (Fields, Params, State(..), view)

import Browser
import Html exposing (..)


type alias Params m =
    { fields : Fields
    , state : State
    , onCheck : Fields -> m
    }


type alias Fields =
    { emailAddress : String
    , password : String
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
