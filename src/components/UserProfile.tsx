import { useUser } from "../hooks/useUser";
import Loading from "./Loading";
import ProfileForm from "./ProfileForm";


export default function UserProfile() {

  const { user } = useUser();
  if (!user) return <Loading />;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <ProfileForm />
    </div>
  );
}