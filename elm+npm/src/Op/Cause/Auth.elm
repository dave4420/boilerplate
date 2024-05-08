module Op.Cause.Auth exposing (..)


type Cause m
    = SignedIn (SignedInParams -> m)
    | FailedToSignIn m
    | SignedOut m
    | ReceivedName (String -> m)


type alias SignedInParams =
    { authToken : String
    , idToken : String
    }


type alias Ports m =
    { signedIn : (SignedInParams -> m) -> Sub m
    , failedToSignIn : (() -> m) -> Sub m
    , signedOut : (() -> m) -> Sub m
    , receivedName : (String -> m) -> Sub m
    }


toSub : Ports m -> Cause m -> Sub m
toSub ports cause =
    case cause of
        SignedIn f ->
            ports.signedIn f

        FailedToSignIn m ->
            ports.failedToSignIn (always m)

        SignedOut m ->
            ports.signedOut (always m)

        ReceivedName f ->
            ports.receivedName f
