import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function Contact() {
    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

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
                            <h4 className="text-lg font-medium">Dr. John Doe</h4>
                            <p className="text-lg text-gray-500">Developer</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Email:</p>
                                <p className="text-md">example@gmail.com</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Phone:</p>
                                <p className="text-md">+1234567890</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Address:</p>
                                <p className="text-md">1234, Main Street, City, Country</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">LinkedIn:</p>
                                <p className="text-md">linkedin.com/in/example</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Github:</p>
                                <p className="text-md">github.com/example</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Website:</p>
                                <p className="text-md">example.com</p>
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
                            />
                            <Input
                                label="Last Name"
                                labelPlacement="outside"
                                placeholder="Last Name"
                                type="text"
                            />
                            <Select
                                label="Title"
                                labelPlacement="outside"
                                placeholder=""
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
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Email"
                                type="email"
                            />
                            <Input
                                label="Phone"
                                labelPlacement="outside"
                                placeholder="Phone"
                                type="tel"
                            />
                            <Input
                                label="Address"
                                labelPlacement="outside"
                                placeholder="Address"
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="LinkedIn"
                                labelPlacement="outside"
                                placeholder="LinkedIn"
                                type="text"
                            />
                            <Input
                                label="Github"
                                labelPlacement="outside"
                                placeholder="Github"
                                type="text"
                            />
                            <Input
                                label="Website"
                                labelPlacement="outside"
                                placeholder="Website"
                                type="text"
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <Button className="mt-4 mr-2">
                                Add
                            </Button>
                        </div>
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
