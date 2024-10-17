import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

function Footer() {
    function NavigatingSocial(url) {
        window.open(url, 'noopener,noreferrer');
    }
    return (
        <footer>
            <Box sx={{ background: "#58B958", display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr" }, padding: { md: "40px 50px", xs: "40px 10px" } }}>
                <Box sx={{ textAlign: "center" }}>
                    <Box component='img' src={"/assets/icons/nurjazBlack.svg"} />
                    <Typography sx={{ color: "white", fontWeight: 500, fontSize: "24px", textAlign: "center" }}>NURJAZ BRAND</Typography>
                    <Typography sx={{ color: "white", width: "auto", fontWeight: 200, fontSize: "14px", textAlign: "center", padding: "0 50px" }}>
                        Мы являемся швейным производством полного цикла, специализирующимся
                        на изготовлении одежды для всех слоев: базового, среднего и верхнего.
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <Typography sx={{ color: "white", width: { md: "300px" }, fontWeight: 500, fontSize: "24px", textAlign: { xs: "center" }, margin: { xs: "40px 0 0 0" } }}>Контакты</Typography>
                    <Box onClick={() => NavigatingSocial("https://wa.me/996702085452/")} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" }, gap: "10px", cursor: "pointer" }}>
                        <Image width={22} height={22} src="/assets/icons/whatsAppWhite.svg" />
                        <Typography sx={{ color: "white", ":hover": { borderBottom: "1px white solid" }, }}>+996 000 000 000</Typography>
                    </Box>
                    <Box onClick={() => NavigatingSocial("https://www.instagram.com/nurjaz_brand/")} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" }, gap: "10px", cursor: "pointer" }}>
                        <Image width={22} height={22} src="/assets/icons/instaWhite.svg" />
                        <Typography sx={{ color: "white", ":hover": { borderBottom: "1px white solid" }, }}>nurjaz_brand</Typography>
                    </Box>
                    <Box onClick={() => NavigatingSocial("https://go.2gis.com/cmxd2")} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" }, gap: "10px", cursor: "pointer" }}>
                        <Image width={22} height={22} src="/assets/icons/locationWhite.svg" />
                        <Typography sx={{ color: "white", ":hover": { borderBottom: "1px white solid" }, }}>Чуй 56</Typography>
                    </Box>
                    <Box onClick={() => { window.location.href = 'tel:+996999444072'; }} sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "start" }, gap: "10px", cursor: "pointer" }}>
                        <Image width={22} height={22} src="/assets/icons/phoneWhite.svg" />
                        <Typography sx={{ color: "white", ":hover": { borderBottom: "1px white solid" }, }}>+996 000 000 000</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <Typography sx={{ color: "white", width: { md: "300px" }, fontWeight: 500, fontSize: "24px", textAlign: { xs: "center" }, margin: { xs: "40px 0 0 0" } }}>
                        Навигация по сайту
                    </Typography>
                    {
                        navigatins.map((e, ind) => (
                            <Box sx={{ textDecoration: "none", textAlign: { xs: "center", md: "start" } }} href={"#" + e.url} component="a" key={"navs" + ind}>
                                <Typography component="span" sx={{
                                    color: "white", ":hover": { borderBottom: "1px white solid" },
                                    cursor: "pointer",
                                }}>
                                    {e.title}
                                </Typography>
                            </Box>

                        ))
                    }
                </Box>

            </Box>
            <Box sx={{
                background: "#58B958", display: { md: "flex", xs: "block" }, justifyContent: "space-around", padding: "20px 50px",
                borderTop: "1px dashed #ffffff", borderImageWidth: 4
            }}>
                <Typography sx={{ color: "white", fontWeight: 200, fontSize: { xs: "12px" } }}>©2024 NURJAZ BRAND. Все права защищены.</Typography>
                <Typography onClick={() => NavigatingSocial("https://t.me/shareoi")} sx={{ color: "white", fontWeight: 200, borderBottom: "1px solid #58B958", cursor: "pointer", ":hover": { borderBottom: "1px solid white" } }}>Сайт разработан ❤ +996 (999) 444 072</Typography>
            </Box>
        </footer>
    )
}

export default Footer

const navigatins = [
    { title: "Главная", url: "", },
    { title: "Контакты", url: "contact", },
    { title: "О компании", url: "about-company", },
    { title: "Галерия", url: "galery", },
    { title: "Этапы", url: "steps", },
]