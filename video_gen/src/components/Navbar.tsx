import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@heroui/react'
import { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <HeroNavbar
            className="bg-white shadow-md"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-xl md:text-2xl text-indigo-600">Logo</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Services
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="hidden sm:flex">
                <NavbarItem>
                    <Button color="primary" variant="solid" size="sm" className="hidden md:inline-flex">
                        Sign In
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" variant="bordered" size="sm" className="hidden md:inline-flex">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link color="foreground" href="#" className="w-full">
                        Home
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" href="#" className="w-full">
                        About
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" href="#" className="w-full">
                        Services
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" href="#" className="w-full">
                        Contact
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="flex flex-col gap-2 mt-4">
                    <Button color="primary" variant="solid" className="w-full">
                        Sign In
                    </Button>
                    <Button color="primary" variant="bordered" className="w-full">
                        Sign Up
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </HeroNavbar>
    );
};

export default Navbar; 