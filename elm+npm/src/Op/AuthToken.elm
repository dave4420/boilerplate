module Op.AuthToken exposing (AuthToken, fromTypescript)


type AuthToken
    = AuthToken String


fromTypescript : String -> AuthToken
fromTypescript =
    AuthToken
