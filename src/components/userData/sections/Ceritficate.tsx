import { Button, Divider, Input } from "@nextui-org/react";



export default function Certificate() {

    return (
        <div className="max-w-full">
            <div className="space-y-1">
                <h4 className="text-xl font-medium">Certificate</h4>
            </div>
            <Divider className="my-2" />
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
        
    );
};