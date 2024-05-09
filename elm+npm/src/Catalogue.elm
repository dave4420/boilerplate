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
                    { emailAddress =
                        { value = "alice@example.com"
                        , onChange = always ()
                        }
                    , password =
                        { value = "password"
                        , onChange = always ()
                        }
                    , state = SignInPage.Pristine
                    , onCheck = ()
                    }
            )
