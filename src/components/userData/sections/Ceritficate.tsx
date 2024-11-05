import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";



export default function Certificate() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

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
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Certificate</p>
                                    <p className="text-sm">AWS Certified Solutions Architect</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Institution</p>
                                    <p className="text-sm">Amazon Web Services</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Date</p>
                                    <p className="text-sm">2022-05-15</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Certificate</p>
                                    <p className="text-sm">Certified Kubernetes Administrator</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Institution</p>
                                    <p className="text-sm">Cloud Native Computing Foundation</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Date</p>
                                    <p className="text-sm">2021-11-20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Certificate"
                                labelPlacement="outside"
                                placeholder="Certificate"
                                type="text"
                            />
                            <Input
                                label="Institution"
                                labelPlacement="outside"
                                placeholder="Institution"
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Date"
                                labelPlacement="outside"
                                placeholder="Date"
                                type="date"
                            />
                            <Input
                                label="Credential ID"
                                labelPlacement="outside"
                                placeholder="Credential ID"
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
                    <div className="flex justify-end items-center">
                        <Button
                            onClick={triggerUpdate}
                            className=" mr-2"
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div >

    );
};