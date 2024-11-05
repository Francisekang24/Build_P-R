import { Button, Divider, Input, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";


export default function Contact() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="max-w-full">
            <div className="space-y-1">
                <Card>
                    <CardHeader>
                        <h4 className="text-xl font-medium">Contact Information</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="flex gap-4">
                            <h4 className="text-lg font-medium">Dr. John Doe</h4>
                            <p className="text-lg text-gray-500">Devloper</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Email:</p>
                                <p className="text-md">example@gmail.com </p>
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
                    </CardBody>
                    <CardFooter>
                        <Button onPress={onOpen} className="mt-2">Update information</Button>
                    </CardFooter>
                </Card>
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size="3xl"
                placement="bottom-center"
                classNames={{
                    body: "py-6",
                    base: "border-[#292f46] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-medium">Contact Information</h4>
                                </div>
                            </ModalHeader>
                            <ModalBody>
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
                                        label="title"
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
                                        type="text" />
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};