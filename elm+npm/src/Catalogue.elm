module Catalogue exposing (main)

import Element
import Html
import UiExplorer
import View.Page.HomePage as HomePage
import View.Page.SignInPage as SignInPage


main =
    UiExplorer.application UiExplorer.defaultConfig pages


staticDocument doc =
    UiExplorer.static (\_ _ -> doc.body |> Html.div [] |> Element.html)


pages =
    UiExplorer.firstPage "Home page" (staticDocument <| HomePage.view { name = "Alice" })
        |> UiExplorer.nextPage "Sign in"
            (staticDocument <|
                SignInPage.view
                    { fields =
                        { emailAddress = "alice@example.com"
                        , password = "password"
                        }
                    , state = SignInPage.Pristine
                    , onCheck = always ()
                    }
            )
