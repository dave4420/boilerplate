port module Ports exposing (causePorts, effectPorts)

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


port signedIn :
    (Cause.SignedInParams -> m)
    -> Sub m -- DAVE: rm


port failedToSignIn : (() -> m) -> Sub m


port signedOut : (() -> m) -> Sub m


port receiveName :
    (String -> m)
    -> Sub m -- DAVE: rm


causePorts : Cause.Ports m
causePorts =
    { auth =
        { signedIn = signedIn
        , failedToSignIn = failedToSignIn
        , signedOut = signedOut
        , receivedName = receiveName
        }
    }
