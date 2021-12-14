import React, {useState} from 'react';
import Notepad from './component/Notepad';
import { auth } from "./firebase";
import GoogleSignIn from "./component/GoogleSignIn";

function App() {
    const [user, setUser] = useState<any>();
    auth.onAuthStateChanged(user => {
        // user.currentUser 를 통해 현재 로그인 중인 사용자에 대한 정보를 이용할 수 있다.
        // ex) user.currentUser.email, user.currentUser.displayName ... etc

        if (user !== null) {
            setUser(user);
        }
    });

    return (
        <>
            {user ?
                <Notepad />
                :
                <GoogleSignIn/>
            }
        </>
    )
}

export default App;
