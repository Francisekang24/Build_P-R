import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Project as ProjectType } from "../../../types/UserData";

export default function Project() {
    const [update, setUpdate] = useState(false);
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const { user } = useUser();
    const projectNameRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const technologyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setProjects(userDoc.data().projects || []);
            }
        };
        fetchProjects();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleAddTechnology = () => {
        if (technologyRef.current?.value) {
            setTechnologies([...technologies, technologyRef.current.value]);
            technologyRef.current.value = "";
        }
    };

    const handleAddProject = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const newProject: ProjectType = {
                name: projectNameRef.current?.value || "",
                link: linkRef.current?.value || "",
                description: descriptionRef.current?.value || "",
                technologies: technologies,
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingProjects = userDoc.exists() ? userDoc.data().projects || [] : [];

            await setDoc(userDocRef, {
                projects: [...existingProjects, newProject]
            }, { merge: true });

            setProjects([...existingProjects, newProject]);
            setTechnologies([]);
            triggerUpdate();
            if (projectNameRef.current) projectNameRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            if (descriptionRef.current) descriptionRef.current.value = "";
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
                        <form>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={projectNameRef}
                                    label="Project Name"
                                    labelPlacement="outside"
                                    placeholder="Project Name"
                                    type="text"
                                />
                                <Input
                                    ref={linkRef}
                                    label="Link"
                                    labelPlacement="outside"
                                    placeholder="Link"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Textarea
                                    ref={descriptionRef}
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Description"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col p-1 w-full">
                                <Input
                                    ref={technologyRef}
                                    label="Technologies"
                                    labelPlacement="outside"
                                    placeholder="Technology"
                                    type="text"
                                />
                                <div className="flex justify-start items-center">
                                    <Button onClick={handleAddTechnology}>
                                        Add Technology
                                    </Button>
                                </div>
                                <ul className="text-sm">
                                    {technologies.map((tech, index) => (
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
                    <Button
                        onClick={triggerUpdate}
                    >
                        {update ? "Done" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};