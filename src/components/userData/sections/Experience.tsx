import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { WorkExperience as ExperienceType } from "../../../types/UserData";

export default function Experience() {
    const [update, setUpdate] = useState(false);
    const [experience, setExperience] = useState<ExperienceType[]>([]);
    const [experienceEntry, setExperienceEntry] = useState<ExperienceType>({
        company: "",
        position: "",
        responsibilities: [],
        startDate: "",
        endDate: "",
    });
    const [responsibilityInput, setResponsibilityInput] = useState("");
    const { user, UpdateExperience } = useUser();

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

    const handleInputChange = (field: keyof ExperienceType, value: string) => {
        setExperienceEntry((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddResponsibility = () => {
        if (responsibilityInput) {
            setExperienceEntry((prev) => ({
                ...prev,
                responsibilities: [...prev.responsibilities, responsibilityInput]
            }));
            setResponsibilityInput("");
        }
    };

    const handleAddExperience = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const newExperience: ExperienceType = { ...experienceEntry };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingExperience = userDoc.exists() ? userDoc.data().experience || [] : [];

            const updatedExperience = [...existingExperience, newExperience];

            await setDoc(userDocRef, {
                experience: updatedExperience
            }, { merge: true });

            setExperience(updatedExperience);
            setExperienceEntry({
                company: "",
                position: "",
                responsibilities: [],
                startDate: "",
                endDate: "",
            });
            UpdateExperience(updatedExperience);
            triggerUpdate();
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
                        <form onSubmit={(e) => { e.preventDefault(); handleAddExperience(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Company"
                                    labelPlacement="outside"
                                    placeholder="Company"
                                    type="text"
                                    value={experienceEntry.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                />
                                <Input
                                    label="Position"
                                    labelPlacement="outside"
                                    placeholder="Position"
                                    type="text"
                                    value={experienceEntry.position}
                                    onChange={(e) => handleInputChange('position', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 p-1 w-full">
                                <Input
                                    label="Responsibilities"
                                    labelPlacement="outside"
                                    placeholder="Responsibility"
                                    type="text"
                                    value={responsibilityInput}
                                    onChange={(e) => setResponsibilityInput(e.target.value)}
                                />
                                <div className="flex justify-start items-center">
                                    <Button onClick={handleAddResponsibility}>
                                        Add Responsibility
                                    </Button>
                                </div>
                                <ul className="text-sm">
                                    {experienceEntry.responsibilities.map((resp, index) => (
                                        <li key={index}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Start Date"
                                    labelPlacement="outside"
                                    placeholder="Start Date"
                                    type="date"
                                    value={experienceEntry.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                />
                                <Input
                                    label="End Date"
                                    labelPlacement="outside"
                                    placeholder="End Date"
                                    type="date"
                                    value={experienceEntry.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
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
                    <Button onClick={triggerUpdate}>
                        {update ? "Done" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
            <pre>{JSON.stringify(user?.experience, null, 2)}</pre>
        </div>
    );
};
