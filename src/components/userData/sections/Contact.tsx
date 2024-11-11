import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";

export default function Contact() {
    const [update, setUpdate] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        title: "",
        position: "",
        email: "",
        phone: "",
        address: "",
        linkedIn: "",
        github: "",
        website: ""
    });
    const { user, UpdateContactInfo } = useUser();

    useEffect(() => {
        const fetchContactInfo = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setContactInfo(userDoc.data().contactInfo || {});
            }
        };
        fetchContactInfo();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    interface ContactInfo {
        firstName: string;
        lastName: string;
        title: string;
        position: string;
        email: string;
        phone: string;
        address: string;
        linkedIn: string;
        github: string;
        website: string;
    }

    const handleInputChange = (field: keyof ContactInfo, value: string): void => {
        setContactInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveContactInfo = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { contactInfo }, { merge: true });

            triggerUpdate();
            UpdateContactInfo(contactInfo); // Update contact info in user context
        } catch (error) {
            console.error("Error saving contact info: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Contact Information</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex gap-4">
                            <h4 className="text-lg font-medium">{contactInfo.title} {contactInfo.firstName} {contactInfo.lastName}</h4>
                            <p className="text-lg text-gray-500">{contactInfo.position}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Email:</p>
                                <p className="text-md">{contactInfo.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Phone:</p>
                                <p className="text-md">{contactInfo.phone}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Address:</p>
                                <p className="text-md">{contactInfo.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">LinkedIn:</p>
                                <p className="text-md">{contactInfo.linkedIn}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Github:</p>
                                <p className="text-md">{contactInfo.github}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Website:</p>
                                <p className="text-md">{contactInfo.website}</p>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="First Name"
                                labelPlacement="outside"
                                placeholder="First Name"
                                type="text"
                                value={contactInfo.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                            />
                            <Input
                                label="Last Name"
                                labelPlacement="outside"
                                placeholder="Last Name"
                                type="text"
                                value={contactInfo.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                            />
                            <Select
                                label="Title"
                                labelPlacement="outside"
                                placeholder="Title"
                                value={contactInfo.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            >
                                <SelectItem key='Dr'>Dr</SelectItem>
                                <SelectItem key='Mr'>Mr</SelectItem>
                                <SelectItem key='Mrs'>Mrs</SelectItem>
                                <SelectItem key='Ms'>Ms</SelectItem>
                                <SelectItem key='Miss'>Miss</SelectItem>
                                <SelectItem key='Prof'>Prof</SelectItem>
                            </Select>
                            <Input
                                label="Position"
                                labelPlacement="outside"
                                placeholder="Position"
                                type="text"
                                value={contactInfo.position}
                                onChange={(e) => handleInputChange('position', e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Email"
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            <Input
                                label="Phone"
                                labelPlacement="outside"
                                placeholder="Phone"
                                type="tel"
                                value={contactInfo.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                            <Input
                                label="Address"
                                labelPlacement="outside"
                                placeholder="Address"
                                type="text"
                                value={contactInfo.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="LinkedIn"
                                labelPlacement="outside"
                                placeholder="LinkedIn"
                                type="text"
                                value={contactInfo.linkedIn}
                                onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                            />
                            <Input
                                label="Github"
                                labelPlacement="outside"
                                placeholder="Github"
                                type="text"
                                value={contactInfo.github}
                                onChange={(e) => handleInputChange('github', e.target.value)}
                            />
                            <Input
                                label="Website"
                                labelPlacement="outside"
                                placeholder="Website"
                                type="text"
                                value={contactInfo.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <Button className="mt-4 mr-2" onClick={handleSaveContactInfo}>
                                Save
                            </Button>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button onClick={triggerUpdate}>
                        {update ? "Done" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
            <div>
                <pre>{JSON.stringify(user?.contactInfo, null, 2)}</pre>
            </div>
        </div>
    );
};
