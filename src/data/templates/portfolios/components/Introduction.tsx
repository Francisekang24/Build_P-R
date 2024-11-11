import { useUser } from "../../../../hooks/useUser";
import { User } from "lucide-react";


export function Introduction_01() {

  const { user } = useUser();

  return (
    <section className="text-red-300 flex gap-2">
      <div>
        {user?.avatarURL ? <img src={user?.avatarURL} alt="Profile Picture" className="rounded-full w-24 h-24" /> : <User size={64} />}
      </div>
      <div className="flex flex-col">
        <h1 className="text-pretty text-large">{user?.contactInfo?.firstName} {user?.contactInfo?.lastName}</h1>
        <h2 className="tetx-md">{user?.contactInfo?.position}</h2>
        <p className="intro-description">{user?.summary}</p>
      </div>
    </section>
  );
}

export function Introduction_02() {

  const { user } = useUser();

  return (
    <section className="bg-orange-400 flex flex-col gap-1">
      {user?.avatarURL ? <img src={user?.avatarURL} alt="Profile Picture" className="rounded-full w-24 h-24" /> : <User size={64} />}
      <div className="p-4">
        <h1 className="intro-title">{user?.contactInfo?.firstName} {user?.contactInfo?.linkedIn}</h1>
        <h2 className="intro-subtitle">{user?.contactInfo?.position}</h2>
        <p className="intro-description">{user?.summary}</p>
      </div>
    </section>
  );
}
