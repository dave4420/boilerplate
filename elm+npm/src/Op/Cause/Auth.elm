module Op.Cause.Auth exposing (..)

import Domain.ActiveUser as ActiveUser exposing (ActiveUser, TypescriptActiveUser)
import Op.AccessToken as AccessToken exposing (AccessToken)


type Cause m
    = ReceivedIdToken (ActiveUser -> m)
    | ReceivedAccessToken (AccessToken -> m)
    | FailedToSignIn m
    | SignedOut m


type alias Ports m =
    { receivedIdToken : (TypescriptActiveUser -> m) -> Sub m
    , receivedAccessToken : (String -> m) -> Sub m
    , failedToSignIn : (() -> m) -> Sub m
    , signedOut : (() -> m) -> Sub m
    }


toSub : Ports m -> Cause m -> Sub m
toSub ports cause =
    case cause of
        ReceivedIdToken f ->
            ports.receivedIdToken (ActiveUser.fromTypescript >> f)

        ReceivedAccessToken f ->
            ports.receivedAccessToken (AccessToken.fromTypescript >> f)

        FailedToSignIn m ->
            ports.failedToSignIn (always m)

        SignedOut m ->
            ports.signedOut (always m)
