module Catalogue exposing (main)

import Catalogue.SignIn as SignIn
import Catalogue.Util exposing (..)
import UiExplorer
import View.Page.HomePage as HomePage


main =
    UiExplorer.application UiExplorer.defaultConfig pages


pages =
    UiExplorer.firstPage "Home page" (staticDocument <| HomePage.view { name = "Alice" })
        |> UiExplorer.groupPages "Sign in" SignIn.pages
