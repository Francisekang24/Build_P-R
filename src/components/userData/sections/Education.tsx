import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Education as EducationType } from "../../../types/UserData";

export default function Education() {
    const [update, setUpdate] = useState(false);
    const [education, setEducation] = useState<EducationType[]>([]);
    const [educationEntry, setEducationEntry] = useState<EducationType>({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
    });
    const { user, UpdateEducation } = useUser();

    useEffect(() => {
        const fetchEducation = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setEducation(userDoc.data().education || []);
            }
        };
        fetchEducation();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleInputChange = (field: keyof EducationType, value: string) => {
        setEducationEntry((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddEducation = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingEducation = userDoc.exists() ? userDoc.data().education || [] : [];

            const updatedEducation = [...existingEducation, educationEntry];

            await setDoc(userDocRef, {
                education: updatedEducation
            }, { merge: true });

            setEducation(updatedEducation);
            UpdateEducation(updatedEducation);
            setEducationEntry({
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
            });
            triggerUpdate();
        } catch (error) {
            console.error("Error adding education: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Education</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {education.map((edu, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Institution</p>
                                        <p className="text-sm">{edu.institution}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Degree</p>
                                        <p className="text-sm">{edu.degree}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Field of Study</p>
                                        <p className="text-sm">{edu.fieldOfStudy}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Start Date</p>
                                        <p className="text-sm">{edu.startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm">{edu.endDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddEducation(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Institution"
                                    labelPlacement="outside"
                                    placeholder="Institution"
                                    type="text"
                                    value={educationEntry.institution}
                                    onChange={(e) => handleInputChange('institution', e.target.value)}
                                />
                                <Input
                                    label="Degree"
                                    labelPlacement="outside"
                                    placeholder="Degree"
                                    type="text"
                                    value={educationEntry.degree}
                                    onChange={(e) => handleInputChange('degree', e.target.value)}
                                />
                                <Input
                                    label="Field of Study"
                                    labelPlacement="outside"
                                    placeholder="Field of Study"
                                    type="text"
                                    value={educationEntry.fieldOfStudy}
                                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Start Date"
                                    labelPlacement="outside"
                                    placeholder="Start Date"
                                    type="date"
                                    value={educationEntry.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                />
                                <Input
                                    label="End Date"
                                    labelPlacement="outside"
                                    placeholder="End Date"
                                    type="date"
                                    value={educationEntry.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddEducation}>
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
            <pre>{JSON.stringify(user?.education, null, 2)}</pre>
        </div>
    );
};
