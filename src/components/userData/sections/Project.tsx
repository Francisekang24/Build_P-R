import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Project as ProjectType } from "../../../types/UserData";

export default function Project() {
    const [update, setUpdate] = useState(false);
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [newProject, setNewProject] = useState<ProjectType>({ name: "", link: "", description: "", technologies: [] });
    const [technologies, setTechnologies] = useState<string[]>([]);
    const { user, UpdateProjects } = useUser();

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const fetchedProjects = userDoc.data().projects || [];
                setProjects(fetchedProjects);
                UpdateProjects(fetchedProjects); // Only update context after fetching
            }
        };
        fetchProjects();
    }, [user, UpdateProjects]);

    const triggerUpdate = () => setUpdate(!update);

    const handleInputChange = (field: keyof ProjectType, value: string) => {
        setNewProject((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddTechnology = () => {
        if (newProject.technologies) {
            setNewProject((prev) => ({ ...prev, technologies: [...prev.technologies, ...technologies] }));
            setTechnologies([]); // Clear the technologies input after adding
        }
    };

    const handleAddProject = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingProjects = userDoc.exists() ? userDoc.data().projects || [] : [];

            const updatedProjects = [...existingProjects, newProject];

            await setDoc(userDocRef, { projects: updatedProjects }, { merge: true });

            setProjects(updatedProjects);
            UpdateProjects(updatedProjects); // Update context with the new projects array
            setNewProject({ name: "", link: "", description: "", technologies: [] }); // Clear new project fields
            triggerUpdate();
        } catch (error) {
            console.error("Error adding project: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Projects</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {projects.map((project, index) => (
                                <div key={index} className="border-b pb-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Project Name</p>
                                            <p className="text-sm">{project.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Link</p>
                                            <p className="text-sm"><a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Technologies</p>
                                            <ul className="text-sm">
                                                {project.technologies.map((tech, i) => (
                                                    <li key={i}>{tech}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Description</p>
                                            <p className="text-sm">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Project Name"
                                    labelPlacement="outside"
                                    placeholder="Project Name"
                                    type="text"
                                    value={newProject.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                <Input
                                    label="Link"
                                    labelPlacement="outside"
                                    placeholder="Link"
                                    type="text"
                                    value={newProject.link}
                                    onChange={(e) => handleInputChange("link", e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Textarea
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Description"
                                    type="text"
                                    value={newProject.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col p-1 w-full">
                                <Input
                                    label="Technologies"
                                    labelPlacement="outside"
                                    placeholder="Technology"
                                    type="text"
                                    value={technologies.join(", ")}
                                    onChange={(e) => setTechnologies([e.target.value])} // Allow the user to add multiple technologies
                                />
                                <div className="flex justify-start items-center">
                                    <Button onClick={handleAddTechnology}>
                                        Add Technology
                                    </Button>
                                </div>
                                <ul className="text-sm">
                                    {newProject.technologies.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddProject}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button onClick={triggerUpdate}>
                        {update ? "Done" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
            <pre>{JSON.stringify(projects, null, 2)}</pre>
        </div>
    );
};
