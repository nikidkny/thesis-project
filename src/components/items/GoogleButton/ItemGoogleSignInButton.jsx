import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./ItemGoogleSignInButton.scss";

export const ItemGoogleSignInButton = () => {
  const loginUser = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("AUTHENTICATED");
        // Redirect logic goes here
      })
      .catch((err) => {
        console.log("NOT AUTHENTICATED");
        console.log(err);
      });
  };

  // const logoutUser = () => {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       console.log("Signed out!");
  //     })
  //     .catch((err) => {
  //       console.log("Signout error", err);
  //     });
  // };

  return (
    <div id="button" className="item-google-sign-in-button" onClick={loginUser}>
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.64 10.1109C17.64 9.47275 17.5827 8.85911 17.4764 8.27002H9V11.7514H13.8436C13.635 12.8764 13.0009 13.8296 12.0477 14.4677V16.7259H14.9564C16.6582 15.1591 17.64 12.8518 17.64 10.1109Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 18.9065C11.43 18.9065 13.4673 18.1005 14.9564 16.726L12.0477 14.4678C11.2418 15.0078 10.2109 15.3269 9 15.3269C6.65591 15.3269 4.67182 13.7437 3.96409 11.6165H0.957275V13.9483C2.43818 16.8896 5.48182 18.9065 9 18.9065Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.96409 11.6166C3.78409 11.0766 3.68182 10.4997 3.68182 9.90656C3.68182 9.31338 3.78409 8.73656 3.96409 8.19656V5.86475H0.957273C0.347727 7.07975 0 8.45429 0 9.90656C0 11.3588 0.347727 12.7334 0.957273 13.9484L3.96409 11.6166Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 4.48604C10.3214 4.48604 11.5077 4.94013 12.4405 5.83195L15.0218 3.25059C13.4632 1.79831 11.4259 0.906494 9 0.906494C5.48182 0.906494 2.43818 2.92331 0.957275 5.86468L3.96409 8.19649C4.67182 6.06922 6.65591 4.48604 9 4.48604Z"
          fill="#EA4335"
        />
      </svg>
      <span>Sign in with Google</span>
    </div>
  );
};

export default ItemGoogleSignInButton;
