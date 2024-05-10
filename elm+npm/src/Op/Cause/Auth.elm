module Op.Cause.Auth exposing (..)

import Domain.ActiveUser as ActiveUser exposing (ActiveUser, TypescriptActiveUser)
import Op.AuthToken as AuthToken exposing (AuthToken)


type Cause m
    = ReceivedIdToken (ActiveUser -> m)
    | ReceivedAuthToken (AuthToken -> m)
    | FailedToSignIn m
    | SignedOut m


type alias Ports m =
    { receivedIdToken : (TypescriptActiveUser -> m) -> Sub m
    , receivedAuthToken : (String -> m) -> Sub m
    , failedToSignIn : (() -> m) -> Sub m
    , signedOut : (() -> m) -> Sub m
    }


toSub : Ports m -> Cause m -> Sub m
toSub ports cause =
    case cause of
        ReceivedIdToken f ->
            ports.receivedIdToken (ActiveUser.fromTypescript >> f)

        ReceivedAuthToken f ->
            ports.receivedAuthToken (AuthToken.fromTypescript >> f)

        FailedToSignIn m ->
            ports.failedToSignIn (always m)

        SignedOut m ->
            ports.signedOut (always m)
