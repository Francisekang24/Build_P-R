import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Certification } from "../../../types/UserData";

export default function Certificate() {
    const [update, setUpdate] = useState(false);
    const [certificates, setCertificates] = useState<Certification[]>([]);
    const [newCertificate, setNewCertificate] = useState<Certification>({ name: "", organization: "", date: "" });
    const { user, UpdateCertifications } = useUser();

    useEffect(() => {
        const fetchCertificates = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const fetchedCertificates = userDoc.data().certificates || [];
                setCertificates(fetchedCertificates);
                UpdateCertifications(fetchedCertificates); // Only update context after fetching
            }
        };
        fetchCertificates();
    }, [user, UpdateCertifications]);

    const triggerUpdate = () => setUpdate(!update);

    const handleInputChange = (field: keyof Certification, value: string) => {
        setNewCertificate((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddCertificate = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingCertificates = userDoc.exists() ? userDoc.data().certificates || [] : [];

            const updatedCertificates = [...existingCertificates, newCertificate];

            await setDoc(userDocRef, { certificates: updatedCertificates }, { merge: true });

            setCertificates(updatedCertificates);
            UpdateCertifications(updatedCertificates); // Update context with the new certifications array
            setNewCertificate({ name: "", organization: "", date: "" }); // Clear new certificate input fields
            triggerUpdate();
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
                        <form onSubmit={(e) => { e.preventDefault(); handleAddCertificate(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Certificate"
                                    labelPlacement="outside"
                                    placeholder="Certificate"
                                    type="text"
                                    value={newCertificate.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                <Input
                                    label="Institution"
                                    labelPlacement="outside"
                                    placeholder="Institution"
                                    type="text"
                                    value={newCertificate.organization}
                                    onChange={(e) => handleInputChange("organization", e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Date"
                                    labelPlacement="outside"
                                    placeholder="Date"
                                    type="date"
                                    value={newCertificate.date}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
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
                        <Button onClick={triggerUpdate} className="mr-2">
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <pre>{JSON.stringify(certificates, null, 2)}</pre>
        </div>
    );
};
