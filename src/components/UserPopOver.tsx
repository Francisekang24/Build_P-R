import { signOut } from "firebase/auth";
import { useUser } from "../hooks/useUser"
import { Avatar, Button, User, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { auth } from "../firebase/config";



export default function UserPopOver() {

    const { user, avatarURL } = useUser();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <User
                        as="button"
                        name={user?.name || 'user name'}
                        className="transition-transform"
                        avatarProps={{
                            src:  avatarURL || undefined
                        }}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col space-y-2 p-4">
                        <Avatar
                            showFallback
                            src={avatarURL || undefined}
                            size="lg"
                            isBordered color="primary"
                        />
                        <Button
                            radius="full"
                            className="w-20 h-20 text-large"
                            color="danger"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}