import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Skill } from "../../../types/UserData";

export default function Skills() {
    const [update, setUpdate] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({ name: "", level: "" });
    const { user, UpdateSkills } = useUser();

    useEffect(() => {
        const fetchSkills = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const fetchedSkills = userDoc.data().skills || [];
                setSkills(fetchedSkills);
                UpdateSkills(fetchedSkills); // Update skills in user context only after fetching
            }
        };
        fetchSkills();
    }, [user, UpdateSkills]);

    const triggerUpdate = () => setUpdate(!update);

    const handleInputChange = (field: keyof Skill, value: string) => {
        setNewSkill((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddSkill = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingSkills = userDoc.exists() ? userDoc.data().skills || [] : [];

            const updatedSkills = [...existingSkills, newSkill];

            await setDoc(userDocRef, { skills: updatedSkills }, { merge: true });

            setSkills(updatedSkills);
            UpdateSkills(updatedSkills); // Update context with the new skills array
            setNewSkill({ name: "", level: "" }); // Clear new skill input fields
            triggerUpdate();
        } catch (error) {
            console.error("Error adding skill: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Skills</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Skill</p>
                                        <p className="text-sm">{skill.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Proficiency</p>
                                        <p className="text-sm">{skill.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddSkill(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Skill"
                                    labelPlacement="outside"
                                    placeholder="Skill"
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                <Input
                                    label="Proficiency"
                                    labelPlacement="outside"
                                    placeholder="Proficiency"
                                    type="text"
                                    value={newSkill.level}
                                    onChange={(e) => handleInputChange("level", e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddSkill}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-end items-center">
                        <Button onClick={triggerUpdate} className="mr-2">
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <pre>{JSON.stringify(user?.skills, null, 2)}</pre>
        </div>
    );
};
