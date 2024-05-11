module Op.Effect.Auth exposing (..)


type Effect
    = SignIn SignInParams
    | SignOut


type alias SignInParams =
    { emailAddress : String
    , password : String
    }


type alias Ports m =
    { signIn : SignInParams -> Cmd m
    , signOut : Cmd m
    }


toCmd : Ports m -> Effect -> Cmd m
toCmd ports effect =
    case effect of
        SignIn params ->
            ports.signIn params

        SignOut ->
            ports.signOut
