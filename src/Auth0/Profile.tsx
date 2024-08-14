import { useAuth0 } from "@auth0/auth0-react";

const Profile:React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    console.log(user);
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex">
        <img className="object-cover rounded-full w-10" src={user?.picture} alt={user?.name} />
        <div className="mx-2 flex flex-col font-mono text-white text-sm">
        <p className="">{user?.name}</p>
        <p className="">{user?.email}</p>
      </div>
      </div>
    )
  );
};

export default Profile;