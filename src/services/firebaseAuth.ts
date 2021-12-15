import {auth} from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// firebase 인증지속성 설정 -> NONE: 새로고침시 기존 인증정보 폐기, LOCAL: 활동 폐기시에도 state 유지, SESSION: 현재 탭, 세션안에서만 유지
// auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        return auth
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });

// GoogleAuthProvider class를 authentication 라이브러리에서 사용할 수 있도록 불러오는 코드.
const provider = new firebase.auth.GoogleAuthProvider();

// signIn이랑 authentication을 위해서 GoogleAuthProcider를 사용할 때마다 구글 팝업을 항상 띄우기를 원한다는 의미.
provider.setCustomParameters({prompt: 'select_account'});

// signInWithPopup 메소드는 여러 파라미터를 받을 수 있다. 트위터, 페이스북, 깃허브 등으로도 로그인이 필요할 수도 있으므로,
// 여기에서는 google로 signIn할 것이기 때문에, 파라미터로 위에서 정의한 provider를 넣어준다.
export const signInWithGoogle = () => auth.signInWithPopup(provider);