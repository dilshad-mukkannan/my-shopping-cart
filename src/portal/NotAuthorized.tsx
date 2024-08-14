import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const NotAuthorized: React.FC = () => {
    const {user} = useAuth0();
    console.log(user?.sub);
  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold">403 - Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default NotAuthorized;
