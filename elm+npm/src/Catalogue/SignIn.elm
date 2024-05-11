module Catalogue.SignIn exposing (pages)

import Catalogue.Util exposing (..)
import UiExplorer
import View.Screen.SignInScreen as SignInScreen


page state =
    staticDocument <|
        SignInScreen.view
            { emailAddress =
                { value = "alice@example.com"
                , onChange = always ()
                }
            , password =
                { value = "password"
                , onChange = always ()
                }
            , state = state
            , onCheck = ()
            }


pages =
    UiExplorer.nextPage "Pristine" (page SignInScreen.Pristine)
        >> UiExplorer.nextPage "Checking" (page SignInScreen.Checking)
        >> UiExplorer.nextPage "Failed" (page <| SignInScreen.Failed "No access for you!")
