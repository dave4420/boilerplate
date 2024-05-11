module Op.AccessToken exposing (AccessToken, fromTypescript)


type AccessToken
    = AccessToken String


fromTypescript : String -> AccessToken
fromTypescript =
    AccessToken
