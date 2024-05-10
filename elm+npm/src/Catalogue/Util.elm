module Catalogue.Util exposing (..)

import Element
import Html
import UiExplorer


staticDocument doc =
    UiExplorer.static (\_ _ -> doc.body |> Html.div [] |> Element.html)
