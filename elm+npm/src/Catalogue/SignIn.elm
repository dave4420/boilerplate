module Catalogue.SignIn exposing (pages)

import Catalogue.Util exposing (..)
import UiExplorer
import View.Page.SignInPage as SignInPage


page state =
    staticDocument <|
        SignInPage.view
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
    UiExplorer.nextPage "Pristine" (page SignInPage.Pristine)
        >> UiExplorer.nextPage "Checking" (page SignInPage.Checking)
        >> UiExplorer.nextPage "Failed" (page <| SignInPage.Failed "No access for you!")
