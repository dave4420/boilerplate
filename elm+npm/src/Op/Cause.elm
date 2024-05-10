module Op.Cause exposing
    ( Cause
    , Causes
    , Ports
    , SignedInParams
    , failedToSignIn
    , receivedName
    , signedIn
    , signedOut
    , toSub
    )

import Op.Cause.Auth as Auth



--  Causes are like subscriptions (Platform.Sub), except
--   -  we can introspect on them to write integration tests
--
--  I would have called them Coeffects, but that sounds a bit category theory.


type Cause m
    = Auth (Auth.Cause m)


type alias Causes m =
    List (Cause m)


type alias Ports m =
    { auth : Auth.Ports m
    }


toSub : Ports m -> Causes m -> Sub m
toSub ports causes =
    let
        f cause =
            case cause of
                Auth kause ->
                    Auth.toSub ports.auth kause
    in
    causes
        |> List.map f
        |> Sub.batch



-- Auth


auth : Auth.Cause m -> Causes m
auth =
    Auth >> List.singleton


type alias SignedInParams =
    Auth.SignedInParams


signedIn : (SignedInParams -> m) -> Causes m
signedIn f =
    Auth.SignedIn f |> auth


failedToSignIn : m -> Causes m
failedToSignIn m =
    Auth.FailedToSignIn m |> auth


signedOut : m -> Causes m
signedOut m =
    Auth.SignedOut m |> auth


receivedName : (String -> m) -> Causes m
receivedName f =
    Auth.ReceivedName f |> auth