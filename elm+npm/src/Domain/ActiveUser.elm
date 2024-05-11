module Domain.ActiveUser exposing
    ( ActiveUser
    , TypescriptActiveUser
    , forename
    , fromTypescript
    )


type ActiveUser
    = ActiveUser TypescriptActiveUser


type alias TypescriptActiveUser =
    { forename : String
    }


fromTypescript : TypescriptActiveUser -> ActiveUser
fromTypescript =
    ActiveUser


forename : ActiveUser -> String
forename (ActiveUser fields) =
    fields.forename
