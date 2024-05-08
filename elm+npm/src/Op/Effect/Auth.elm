module Op.Effect.Auth exposing (..)


type Effect
    = SignIn SignInParams
    | SignOut
    | DemandName String


type alias SignInParams =
    { emailAddress : String
    , password : String
    }


type alias Ports m =
    { signIn : SignInParams -> Cmd m
    , signOut : Cmd m
    , demandName : String -> Cmd m
    }


toCmd : Ports m -> Effect -> Cmd m
toCmd ports effect =
    case effect of
        SignIn params ->
            ports.signIn params

        SignOut ->
            ports.signOut

        DemandName name ->
            ports.demandName name
