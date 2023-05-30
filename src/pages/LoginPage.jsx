import classNames from "classnames";
import ItemGoogleSignInButton from "../components/items/GoogleButton/ItemGoogleSignInButton";
import BackgroundVideo from "../components/BackgroundVideo";
import Header from "../components/globals/Header/Header";
import Footer from "../components/globals/Footer/Footer";
import LoginButton from "../components/items/LoginButton/LoginButton";
import { supabase } from "../../supabase";

const handleLogin = async () => {
  const { error } = await supabase.auth.signIn({ provider: "google" }); // Use the appropriate provider

  if (error) {
    console.error("Error signing in:", error.message);
  }
};
const LoginPage = ({ className, buttonLabel }) => {
  var classes = classNames([className, "login"]);

  return (
    <div className={classes}>
      <Header theme="dark" />
      <div className="form">
        <h2>Login</h2>
        <input type="email" />
        <input type="text" />
        <LoginButton onClick={handleLogin} buttonLabel="Sign in" />
        <div>Or</div>
        <ItemGoogleSignInButton />
      </div>
      <BackgroundVideo></BackgroundVideo>
      <Footer />
    </div>
  );
};

export default LoginPage;
