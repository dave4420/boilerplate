module Op.Cause exposing
    ( Cause
    , Causes
    , Ports
    , failedToSignIn
    , receivedAccessToken
    , receivedIdToken
    , signedOut
    , toSub
    )

import Domain.ActiveUser exposing (ActiveUser)
import Op.AccessToken exposing (AccessToken)
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


receivedIdToken : (ActiveUser -> m) -> Causes m
receivedIdToken f =
    Auth.ReceivedIdToken f |> auth


receivedAccessToken : (AccessToken -> m) -> Causes m
receivedAccessToken f =
    Auth.ReceivedAccessToken f |> auth


failedToSignIn : m -> Causes m
failedToSignIn m =
    Auth.FailedToSignIn m |> auth


signedOut : m -> Causes m
signedOut m =
    Auth.SignedOut m |> auth
