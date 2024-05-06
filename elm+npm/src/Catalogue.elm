module Catalogue exposing (main)

import Element
import UiExplorer

import View.Page.HomePage as HomePage

main = UiExplorer.application UiExplorer.defaultConfig pages

staticHtml html = UiExplorer.static (\_ _ -> Element.html html)

pages = UiExplorer.firstPage "Home page" (staticHtml HomePage.view)
