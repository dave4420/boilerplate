port module Ports exposing (causePorts, effectPorts)

import Domain.ActiveUser exposing (TypescriptActiveUser)
import Op.Cause as Cause
import Op.Effect as Effect


port signIn : Effect.SignInParams -> Cmd m


port signOut : () -> Cmd m


port demandName : String -> Cmd m


effectPorts : Effect.Ports m
effectPorts =
    { auth =
        { signIn = signIn
        , signOut = signOut ()
        , demandName = demandName
        }
    }


port receivedIdToken : (TypescriptActiveUser -> m) -> Sub m


port receivedAuthToken : (String -> m) -> Sub m


port failedToSignIn : (() -> m) -> Sub m


port signedOut : (() -> m) -> Sub m


causePorts : Cause.Ports m
causePorts =
    { auth =
        { receivedIdToken = receivedIdToken
        , receivedAuthToken = receivedAuthToken
        , failedToSignIn = failedToSignIn
        , signedOut = signedOut
        }
    }
