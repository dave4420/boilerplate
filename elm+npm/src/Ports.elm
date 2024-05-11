port module Ports exposing (causePorts, effectPorts)

import Domain.ActiveUser exposing (TypescriptActiveUser)
import Op.Cause as Cause
import Op.Effect as Effect


port signIn : Effect.SignInParams -> Cmd m


port signOut : () -> Cmd m


port demandName :
    String
    -> Cmd m -- DAVE: rm


effectPorts : Effect.Ports m
effectPorts =
    { auth =
        { signIn = signIn
        , signOut = signOut ()
        , demandName = demandName
        }
    }


port receivedIdToken : (TypescriptActiveUser -> m) -> Sub m


port receivedAccessToken : (String -> m) -> Sub m


port failedToSignIn : (() -> m) -> Sub m


port signedOut : (() -> m) -> Sub m


causePorts : Cause.Ports m
causePorts =
    { auth =
        { receivedIdToken = receivedIdToken
        , receivedAccessToken = receivedAccessToken
        , failedToSignIn = failedToSignIn
        , signedOut = signedOut
        }
    }
