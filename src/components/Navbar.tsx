import { Link, NavLink } from "react-router-dom";
import {
    Navbar as Navigationbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Avatar,
    Image,
} from "@nextui-org/react";
import { useState } from 'react';

import { signOut } from "firebase/auth";
import { useUser } from "../hooks/useUser"
import { auth } from "../firebase/config";
import Logo from "./icon/Logo.tsx";
import SearchIcon from "./icon/SearchIcon.tsx";


export default function Navbar() {

    const { user, avatarURL } = useUser();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    return (
        <Navigationbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <Link to="/">
                        <Logo />
                        <p className="hidden sm:block font-bold text-inherit"> P&R </p>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem>
                        <NavLink to="/resumes" className={({ isActive }) => isActive ? "text-primary" : "text-inherit"} >
                            Resumes
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/portfolios" className={({ isActive }) => isActive ? "text-primary" : "text-inherit"}>
                            Portfolios
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <form onSubmit={handleSearch}>
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                </form>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name={user?.name || 'user name'}
                            size="sm"
                            src={avatarURL || undefined}
                        />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem>
                            <Link to='/data'>Information</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="/profile">Profile</Link>
                        </DropdownItem>
                        <DropdownItem onClick={handleSignOut} key="logout" color="danger">
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </NavbarContent>
        </Navigationbar>
    )
}