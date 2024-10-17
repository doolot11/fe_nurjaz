import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import Image from 'next/image';
// import MenuIcon from '@mui/icons-material/Menu';
import Menu from "../../public/assets/icons/burger.svg"

const BurgerMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Toggle drawer open/close
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Menu items
    const navigates = [
        { title: "Главная", path: "/" },
        { title: "Контакты", path: "contact" },
        { title: "О компании", path: "about-company" },
        { title: "Галерия", path: "galery" },
        { title: "Этапы", path: "steps" },
    ]
    const menuItems = [
        { path: "/", text: 'Главная', onClick: () => console.log('Home clicked') },
        { path: "contact", text: 'Контакты', onClick: () => console.log('About clicked') },
        { path: "about-company", text: 'О компании', onClick: () => console.log('Services clicked') },
        { path: "galery", text: 'Галерия', onClick: () => console.log('Contact clicked') },
        { path: "steps", text: 'Этапы', onClick: () => console.log('Contact clicked') },
    ];
    console.log(drawerOpen);

    return (
        <Box sx={{ display: { md: "none" } }}>
            {/* <AppBar color='white' position="static"> */}
            <Toolbar>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    {/* <MenuIcon /> */}
                    <Image src={Menu} />

                </IconButton>
            </Toolbar>
            {/* </AppBar> */}

            {/* Drawer for the burger menu */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={() => {
                            item.onClick,
                                setDrawerOpen(false)
                        }}>
                            <Box sx={{ textDecoration: "none", color: "#242424" }} component="a" href={"#" + item.path} >
                                <ListItemText primary={item.text} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default BurgerMenu;
