module Catalogue exposing (main)

import Catalogue.SignIn as SignIn
import Catalogue.Util exposing (..)
import UiExplorer
import View.Screen.HomeScreen as HomeScreen


main =
    UiExplorer.application UiExplorer.defaultConfig pages


pages =
    UiExplorer.firstPage "Home page"
        (staticDocument <|
            HomeScreen.view
                { name = "Alice"
                , onSignOut = ()
                }
        )
        |> UiExplorer.groupPages "Sign in" SignIn.pages
