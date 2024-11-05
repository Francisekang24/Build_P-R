import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { useState } from "react";


export default function Education() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

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
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Institution</p>
                                    <p className="text-sm">University of Lagos</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Degree</p>
                                    <p className="text-sm">BSc</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Field of Study</p>
                                    <p className="text-sm">Computer Science</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p className="text-sm">2015</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">End Date</p>
                                    <p className="text-sm">2019</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Institution"
                                labelPlacement="outside"
                                placeholder="Institution"
                                type="text"
                            />
                            <Input
                                label="Degree"
                                labelPlacement="outside"
                                placeholder="Degree"
                                type="text"
                            />
                            <Input
                                label="Field of Study"
                                labelPlacement="outside"
                                placeholder="Field of Study"
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Start Date"
                                labelPlacement="outside"
                                placeholder="Start Date"
                                type="date"
                            />
                            <Input
                                label="End Date"
                                labelPlacement="outside"
                                placeholder="End Date"
                                type="date"
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