module Op.Effect exposing
    ( Config
    , Effects
    , Ports
    , SignInParams
    , demandName
    , signIn
    , signOut
    , toCmd
    )

import Op.Effect.Auth as Auth



--  Effects are like commands (Platform.Cmd), except
--   -  we can introspect on them to write integration tests
--   -  we can provide config at the top level, to avoid prop-drilling


type Effect m
    = Auth Auth.Effect


type alias Effects m =
    List (Effect m)


type alias Ports m =
    { auth : Auth.Ports m
    }


type alias Config =
    {}


toCmd : Ports m -> Config -> Effects m -> Cmd m
toCmd ports _ effects =
    let
        f effect =
            case effect of
                Auth eff ->
                    Auth.toCmd ports.auth eff
    in
    effects
        |> List.map f
        |> Cmd.batch



-- Auth


auth : Auth.Effect -> Effects m
auth =
    Auth >> List.singleton


type alias SignInParams =
    Auth.SignInParams


signIn : SignInParams -> Effects m
signIn params =
    Auth.SignIn params |> auth


signOut : Effects m
signOut =
    Auth.SignOut |> auth


demandName : String -> Effects m
demandName name =
    Auth.DemandName name |> auth
