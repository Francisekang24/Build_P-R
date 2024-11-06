import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Education as EducationType } from "../../../types/UserData";

export default function Education() {
    const [update, setUpdate] = useState(false);
    const [education, setEducation] = useState<EducationType[]>([]);
    const { user } = useUser();
    const institutionRef = useRef<HTMLInputElement>(null);
    const degreeRef = useRef<HTMLInputElement>(null);
    const fieldOfStudyRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

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

    const handleAddEducation = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const newEducation: EducationType = {
                institution: institutionRef.current?.value || "",
                degree: degreeRef.current?.value || "",
                fieldOfStudy: fieldOfStudyRef.current?.value || "",
                startDate: startDateRef.current?.value || "",
                endDate: endDateRef.current?.value || "",
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingEducation = userDoc.exists() ? userDoc.data().education || [] : [];

            await setDoc(userDocRef, {
                education: [...existingEducation, newEducation]
            }, { merge: true });

            setEducation([...existingEducation, newEducation]);
            triggerUpdate();
            if (institutionRef.current) institutionRef.current.value = "";
            if (degreeRef.current) degreeRef.current.value = "";
            if (fieldOfStudyRef.current) fieldOfStudyRef.current.value = "";
            if (startDateRef.current) startDateRef.current.value = "";
            if (endDateRef.current) endDateRef.current.value = "";
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
                        <form>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={institutionRef}
                                    label="Institution"
                                    labelPlacement="outside"
                                    placeholder="Institution"
                                    type="text"
                                />
                                <Input
                                    ref={degreeRef}
                                    label="Degree"
                                    labelPlacement="outside"
                                    placeholder="Degree"
                                    type="text"
                                />
                                <Input
                                    ref={fieldOfStudyRef}
                                    label="Field of Study"
                                    labelPlacement="outside"
                                    placeholder="Field of Study"
                                    type="text"
                                />
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
                                <Button className="mt-4 mr-2" onClick={handleAddEducation}>
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