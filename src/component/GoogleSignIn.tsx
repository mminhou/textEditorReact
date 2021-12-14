import React from "react";
import {auth, signInWithGoogle} from "../firebase";
import {Grid} from "@material-ui/core";

function GoogleSignIn() {
    auth.onAuthStateChanged(user => {
        // user.currentUser 를 통해 현재 로그인 중인 사용자에 대한 정보를 이용할 수 있다.
        // ex) user.currentUser.email, user.currentUser.displayName ... etc

        if (user !== null) {
            console.log(user)
            console.log("로그인 되었습니다.")
        }
    });

    return (
        <Grid container style={{height: '100%', backgroundColor: "rgb(38, 38, 38)"}} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <button type="button" className="login-with-google-btn" onClick={signInWithGoogle}>
                    Sign in with Google
                </button>
            </Grid>
        </Grid>

    );
}

export default GoogleSignIn;