module Catalogue exposing (main)

import Element
import Html
import UiExplorer
import View.Page.HomePage as HomePage


main =
    UiExplorer.application UiExplorer.defaultConfig pages


staticDocument doc =
    UiExplorer.static (\_ _ -> doc.body |> Html.div [] |> Element.html)


pages =
    UiExplorer.firstPage "Home page" (staticDocument HomePage.view)
