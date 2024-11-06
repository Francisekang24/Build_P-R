import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { WorkExperience as ExperienceType } from "../../../types/UserData";

export default function Experience() {
    const [update, setUpdate] = useState(false);
    const [experience, setExperience] = useState<ExperienceType[]>([]);
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const { user } = useUser();
    const companyRef = useRef<HTMLInputElement>(null);
    const positionRef = useRef<HTMLInputElement>(null);
    const responsibilityRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchExperience = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setExperience(userDoc.data().experience || []);
            }
        };
        fetchExperience();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleAddResponsibility = () => {
        if (responsibilityRef.current?.value) {
            setResponsibilities([...responsibilities, responsibilityRef.current.value]);
            responsibilityRef.current.value = "";
        }
    };

    const handleAddExperience = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const newExperience: ExperienceType = {
                company: companyRef.current?.value || "",
                position: positionRef.current?.value || "",
                responsibilities: responsibilities,
                startDate: startDateRef.current?.value || "",
                endDate: endDateRef.current?.value || "",
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingExperience = userDoc.exists() ? userDoc.data().experience || [] : [];

            await setDoc(userDocRef, {
                experience: [...existingExperience, newExperience]
            }, { merge: true });

            setExperience([...existingExperience, newExperience]);
            setResponsibilities([]);
            triggerUpdate();
            if (companyRef.current) companyRef.current.value = "";
            if (positionRef.current) positionRef.current.value = "";
            if (startDateRef.current) startDateRef.current.value = "";
            if (endDateRef.current) endDateRef.current.value = "";
        } catch (error) {
            console.error("Error adding experience: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Experience</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {experience.map((exp, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Company</p>
                                            <p className="text-sm">{exp.company}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Position</p>
                                            <p className="text-sm">{exp.position}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Responsibilities</p>
                                            <ul className="text-sm">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <li key={i}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm font-medium">Start Date</p>
                                            <p className="text-sm">{exp.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">End Date</p>
                                            <p className="text-sm">{exp.endDate}</p>
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
                                    ref={companyRef}
                                    label="Company"
                                    labelPlacement="outside"
                                    placeholder="Company"
                                    type="text"
                                />
                                <Input
                                    ref={positionRef}
                                    label="Position"
                                    labelPlacement="outside"
                                    placeholder="Position"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-2 p-1 w-full">
                                <Input
                                    ref={responsibilityRef}
                                    label="Responsibilities"
                                    labelPlacement="outside"
                                    placeholder="Responsibility"
                                    type="text"
                                />
                                <div className="flex justify-start items-center">
                                    <Button onClick={handleAddResponsibility}>
                                        Add Responsibility
                                    </Button>
                                </div>
                                <ul className="text-sm">
                                    {responsibilities.map((resp, index) => (
                                        <li key={index}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={startDateRef}
                                    label="Start Date"
                                    labelPlacement="outside"
                                    placeholder="Start Date"
                                    type="date"
                                />
                                <Input
                                    ref={endDateRef}
                                    label="End Date"
                                    labelPlacement="outside"
                                    placeholder="End Date"
                                    type="date"
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddExperience}>
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