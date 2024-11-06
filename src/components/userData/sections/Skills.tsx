import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Skill } from "../../../types/UserData";

export default function Skills() {
    const [update, setUpdate] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const { user } = useUser();
    const skillRef = useRef<HTMLInputElement>(null);
    const proficiencyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setSkills(userDoc.data().skills || []);
            }
        };
        fetchSkills();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleAddSkill = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const skill: Skill = {
                name: skillRef.current?.value || "",
                level: proficiencyRef.current?.value || "",
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingSkills = userDoc.exists() ? userDoc.data().skills || [] : [];

            await setDoc(userDocRef, {
                skills: [...existingSkills, skill]
            }, { merge: true });

            setSkills([...existingSkills, skill]);
            triggerUpdate();
            if (skillRef.current) skillRef.current.value = "";
            if (proficiencyRef.current) proficiencyRef.current.value = "";
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
                        <form>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={skillRef}
                                    label="Skill"
                                    labelPlacement="outside"
                                    placeholder="Skill"
                                    type="text"
                                />
                                <Input
                                    ref={proficiencyRef}
                                    label="Proficiency"
                                    labelPlacement="outside"
                                    placeholder="Proficiency"
                                    type="text"
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
                        <Button
                            onClick={triggerUpdate}
                            className="mr-2"
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};