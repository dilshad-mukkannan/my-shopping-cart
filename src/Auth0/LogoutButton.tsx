import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton:React.FC = () => {
    const {logout, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
            <button className="bg-red-600 block p-2 rounded" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
        )
    );
}

export default LogoutButton;

// import { useAuth0 } from "@auth0/auth0-react";

// const LogoutButton:React.FC = () => {
//   const {logout } = useAuth0();

  

//   return (

//     <button className="bg-red-600 block p-2 rounded" onClick={() => logout({ logoutParams: { returnTo: "http://localhost:5173/" } })}>
//       Log Out
//     </button>
    

//   );
// };

// export default LogoutButton;