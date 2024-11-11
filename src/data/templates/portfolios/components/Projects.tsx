import { useUser } from "../../../../hooks/useUser";


export function Projects_01() {
  const { user } = useUser();

  return (
    <section className="flex flex-col gap-4">
        <h1 className="text-pretty text-large">Projects</h1>
        {user?.projects?.map((project, index) => (
            <div key={index} className="flex flex-col gap-1">
            {project.image && <img src={project.image} alt={project.name} className="rounded-lg w-full h-48" />}
            <h2 className="text-md">{project.name}</h2>
            <p className="text-sm">{project.description}</p>
            <span>{project.link}</span>
            </div>
        ))}
    </section>
  );
}

export function Projects_02() {
  const { user } = useUser();

  return (
    <section className="bg-orange-400 flex flex-col gap-4">
        <h1 className="text-pretty text-large">Projects</h1>
        {user?.projects?.map((project, index) => (
            <div key={index} className="flex flex-col gap-1">
            {project.image && <img src={project.image} alt={project.name} className="rounded-lg w-full h-48" />}
            <h2 className="text-md">{project.name}</h2>
            <p className="text-sm">{project.description}</p>
            <span>{project.link}</span>
            </div>
        ))}
    </section>
  );
}