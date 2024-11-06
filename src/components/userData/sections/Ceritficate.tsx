import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Certification } from "../../../types/UserData";

export default function Certificate() {
    const [update, setUpdate] = useState(false);
    const [certificates, setCertificates] = useState<Certification[]>([]);
    const { user } = useUser();
    const nameRef = useRef<HTMLInputElement>(null);
    const organizationRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setCertificates(userDoc.data().certificates || []);
            }
        };
        fetchCertificates();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleAddCertificate = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const certificate: Certification = {
                name: nameRef.current?.value || "",
                organization: organizationRef.current?.value || "",
                date: dateRef.current?.value || "",
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingCertificates = userDoc.exists() ? userDoc.data().certificates || [] : [];

            await setDoc(userDocRef, {
                certificates: [...existingCertificates, certificate]
            }, { merge: true });

            setCertificates([...existingCertificates, certificate]);
            triggerUpdate();
            if (nameRef.current) nameRef.current.value = "";
            if (organizationRef.current) organizationRef.current.value = "";
            if (dateRef.current) dateRef.current.value = "";
        } catch (error) {
            console.error("Error adding certificate: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Certificate</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {certificates.map((cert, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Certificate</p>
                                        <p className="text-sm">{cert.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Institution</p>
                                        <p className="text-sm">{cert.organization}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Date</p>
                                        <p className="text-sm">{cert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <form>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={nameRef}
                                    label="Certificate"
                                    labelPlacement="outside"
                                    placeholder="Certificate"
                                    type="text"
                                />
                                <Input
                                    ref={organizationRef}
                                    label="Institution"
                                    labelPlacement="outside"
                                    placeholder="Institution"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={dateRef}
                                    label="Date"
                                    labelPlacement="outside"
                                    placeholder="Date"
                                    type="date"
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddCertificate}>
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
