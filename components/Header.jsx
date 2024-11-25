// "use client"
import React from 'react'
import { Box, Typography } from '@mui/material'
import Logo from "../public/assets/icons/nurjazLogo.svg"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BurgerMenu from './ui/BurgerMenu'

const navigates = [
    { title: "Главная", path: "/" },
    { title: "Контакты", path: "contact" },
    { title: "О компании", path: "about-company" },
    { title: "Галерия", path: "galery" },
    { title: "Этапы", path: "steps" },
]

function Header() {
    const router = useRouter();

    function navgating(e) {
        router.push(`/${e}`)
    }
    function navgatingToSignIn(e) {
        router.push(`/signin`)
    }
    return (
        <Box component="header" sx={{ padding: { md: "6px 100px 6px 80px", xs: "6px 20px 6px 20px" } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", }}>
                    <Logo onClick={() => navgating('/')}  alt="Logo" width={60} height={60} />
                    <Typography data-aos="fade-left" sx={{
                        padding: "5px 0 5px 10px", fontWeight: 300, borderLeft: "1px solid #242424",
                        width: { md: "380px" }, marginLeft: { md: "30px", xs: "10px" }, fontSize: { xs: "12px", md: "14px" }
                    }}>
                        Современное производство одежды в Кыргызстане
                    </Typography>
                </Box>
                <BurgerMenu />
                <Box data-aos="zoom-in" sx={{ display: { md: "flex", xs: "none" } }}>
                    {navigates.map((i) => (
                        <Box key={"nav" + i.title}>
                            <Box component="a" sx={{
                                cursor: "pointer", padding: "10px 15px", color: `${router.pathname === i.path ? "#450505" : "#242424"}`,
                                textDecoration: "none"
                            }}
                                // onClick={() => navgating(i.path)}
                                href={"#" + i.path}
                            >{i.title}{
                                }</Box>
                        </Box>
                    ))}
                    <Box onClick={navgatingToSignIn} sx={{ color: "white" }}>signin</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Header