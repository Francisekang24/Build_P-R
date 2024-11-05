import { Button, Divider, Input } from "@nextui-org/react";



export default function Experience() {

    return (

        <div className="max-w-full">
            <div className="space-y-1">
                <h4 className="text-xl font-medium">Experience</h4>
            </div>
            <Divider className="my-2" />
            <div className="flex gap-2 p-1 w-full">
                <Input
                    label="Company"
                    labelPlacement="outside"
                    placeholder="Company"
                    type="text"
                />
                <Input
                    label="Position"
                    labelPlacement="outside"
                    placeholder="Position"
                    type="text"
                />
            </div>
            <div className="flex flex-col gap-2 p-1 w-full">
                <Input
                    label="Responsibilities"
                    labelPlacement="outside"
                    placeholder="responsibility"
                    type="text"
                />
                <div className="flex justify-start items-center">
                <Button >
                    Add
                </Button>
            </div>

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