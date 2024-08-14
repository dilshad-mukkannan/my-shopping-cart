import { useAuth0 } from "@auth0/auth0-react";


interface signupProps {
    screen_hint?: string;
    text: string
}

const LoginButton:React.FC<signupProps> = ({screen_hint, text}) => {
    const {loginWithRedirect, isAuthenticated, user} = useAuth0();
    console.log(JSON.stringify(user));
    return (
        !isAuthenticated && (
            <button className={`${screen_hint ? 'bg-amber-400 text-white font-semibold hover:bg-green-500' : 'bg-orange-600 hover:bg-rose-700 hover:text-white' } block p-2 rounded text-slate-900 font-normal hover:shadow-inner` }
             onClick={() => loginWithRedirect(
                {authorizationParams: {
                    screen_hint: screen_hint
                }}
            )}>{text}</button>
        )
    );
}

export default LoginButton;

// import {useAuth0 } from "@auth0/auth0-react";

// const LoginButton:React.FC = () => {
//   const {user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
//   !isLoading ? console.log(isAuthenticated)
//     : isAuthenticated ? console.log(user) : console.log("dfdfd")

//   return (
//   <button 
//   className="bg-white block p-2 rounded" onClick={() => loginWithRedirect()}>Log In
//   </button>
//   );
// };

// export default LoginButton;