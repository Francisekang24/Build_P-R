import { Button, Divider, Input } from "@nextui-org/react";


export default function Education() {

    return (
        <div className="max-w-full">
            <div className="space-y-1">
                <h4 className="text-xl font-medium">Education</h4>
            </div>
            <Divider className="my-2" />
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
    );
};