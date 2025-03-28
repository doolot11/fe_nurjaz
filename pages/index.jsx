import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Box, Button, Input, Modal, TextareaAutosize, TextField, Typography } from "@mui/material";
import Instagram from "../public/assets/icons/instagram.svg"
import WhatsApp from "../public/assets/icons/whatsApp.svg"
import Phone from "../public/assets/icons/phone.svg"
import Location from "../public/assets/icons/location.svg"
import Ellips from "../public/assets/images/ellipse.svg"
import Square from "../public/assets/images/square.svg"
import Trangle from "../public/assets/images/trangle.svg"
import bannerImage from "../public/assets/images/bannerImage.png"
import DrawingLeft from "../public/assets/images/drawingLeft.svg"
import DrawingRight from "../public/assets/images/drawingRight.svg"
// galery
import image1 from "../public/assets/images/image1.png"
//about company 
// import companyImage from "/assets/images/companyImage.png"
import UsersIcon from "../public/assets/images/usersIcon.svg"
import Clients from "../public/assets/images/clients.svg"
import DoneWears from "../public/assets/images/doneWears.svg"
import CountUp from "react-countup";

import ScrollTop from "../public/assets/icons/scrollTop.svg"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LazyYandexMap from "@/components/LazyYandexMap";
// new years --
import LeftCornerImage from "../public/assets/images/new-year/new-year-left.png"
import RightCornerImage from "../public/assets/images/new-year/new-year-right.png"
import BottomImage from "../public/assets/images/new-year/new-year-bottom.png"

const stylesImage = {
  margin: "15px 5px",
  cursor: "pointer",
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  // boxShadow: 24,
  p: 2,
};

const offoringCards = [
  { title: "Качество продукции ", des: "Пошив оптом одежду легкой группы, верхней и трикотаж.", image: "/assets/images/image1.png" },
  { title: "Дизайн продукции ", des: "Создадим уникальный дизайн одежды для Вас.", image: "/assets/images/image2.png" },
  { title: "Ассортимент тканей", des: "Большой ассортимент материалов: трикотаж, шелк, шифон и т.д.", image: "/assets/images/image3.png" },
  { title: "Шьём оптом", des: "Каждая продукция проходит двойную проверку на качество.", image: "/assets/images/image4.png" },
]
const ourSewing = [
  { title: "Туники", des: "Пошив оптом одежду легкой группы, верхней и трикотаж.", image: "/assets/images/image1.png" },
  { title: "Блузки и рубашки", des: "Создадим уникальный дизайн одежды для Вас.", image: "/assets/images/image2.png" },
  { title: "Шорты", des: "Большой ассортимент материалов: трикотаж, шелк, шифон и т.д.", image: "/assets/images/image3.png" },
  { title: "Шьём оптом", des: "Каждая продукция проходит двойную проверку на качество.", image: "/assets/images/image4.png" },
  { title: "Качество продукции ", des: "Пошив оптом одежду легкой группы, верхней и трикотаж.", image: "/assets/images/image1.png" },
  { title: "Дизайн продукции ", des: "Создадим уникальный дизайн одежды для Вас.", image: "/assets/images/image2.png" },
  { title: "Ассортимент тканей", des: "Большой ассортимент материалов: трикотаж, шелк, шифон и т.д.", image: "/assets/images/image3.png" },
  { title: "Шьём оптом", des: "Каждая продукция проходит двойную проверку на качество.", image: "/assets/images/image4.png" },
]

export const BASE_URL = "https://nurjazkg.ru/api"
// export const BASE_URL = "http://localhost:3001"

export default function Home() {

  const [valueRequest, setValueRequest] = useState({})
  const [validation, setValidatin] = useState({})
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    });
  };

  function getRequest(e) {
    const { name, value } = e.target
    setValueRequest((e) => ({ ...e, [name]: value }))
    setValidatin((e) => ({ ...e, [name]: false }))
  }

  async function sendHandler() {
    if (!valueRequest.fullName) {
      setValidatin((e) => ({ ...e, fullName: true }))
    }
    if (!valueRequest.phone) {
      setValidatin((e) => ({ ...e, phone: true }))
    }
    if (!valueRequest.description) {
      setValidatin((e) => ({ ...e, description: true }))
    }

    if (valueRequest.fullName && valueRequest.phone && valueRequest.description) {
      try {
        const response = await fetch(`${BASE_URL}/request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...valueRequest }),
        })
        const result = await response.json();

        toast.success("Успешно отправлено!")
        setValueRequest({ phone: "", fullName: "", description: "" })
      } catch (error) {
        toast.error("Произашло ошибка!")
      }
    }
  }

  function NavigatingSocial(url) {
    window.open(url, 'noopener,noreferrer');
  }

  const [mainCards, setMainCards] = useState([])

  async function getMainCards() {
    try {
      const response = await fetch(`${BASE_URL}/content/mainCard`)
      const data = await response.json()
      setMainCards(data)
    } catch (error) {
      toast.error("Ошибка!")
    }
  }

  useEffect(() => {
    getMainCards()
  }, [])


  const [detailImages, setDetailImages] = useState([])
  const [detailImagesModal, setDetailImagesModal] = useState(false)

  function showDetailImagesHandle(e) {
    console.log(e, "deta");
    setDetailImages(e.count)
    setDetailImagesModal(true)

  }
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-PZH1PRZN5S');
  }, []);

  return (
    <>
      <Head>
        <title>Швейная фабрика NURJAZ в Кыргызстане</title>
        <meta name="description" content="Оптовый производитель женской одежды Качественный продукт за короткий срок Доставка по всему Минимальный заказ от 300шт" />
        <meta name="keywords" content="швейная фабрика, Кыргызстан, униформа, спецодежда, производство на заказ, NURJAZ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        {/* social */}
        <meta property="og:title" content="Швейная фабрика NURJAZ в Кыргызстане" />
        <meta property="og:description" content="Оптовый производитель женской одежды Качественный продукт за короткий срок Доставка по всему Минимальный заказ от 300шт" />
        <meta property="og:image" content="/assets/images/nurjazLogo.jpg" />
        <meta property="og:url" content="https://www.nurjazkg.ru" />
        <meta name="google-site-verification" content="52v76Lq9KSKupsuHgkEJZTCIVFILRswwOsaCYe9N_eg" /> 
        {/* <meta name="google-site-verification" content="J_-2TkexiSRX4Q_-MrRDPCSmDcm45e4UMYurYqufQjQ" /> */}
        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZH1PRZN5S"></script>

        {/* image analyze */}
        <link rel="preload" href="/_next/static/media/ellipse.8d580903.svg" as="image" type="image/svg+xml"
        />
      </Head>
      <div

      >
        <main >
          <div></div>
          {/* new year images */}
          {/* <Box sx={{ zIndex: 2}}>
            <Image style={{ position: "fixed", top: -6, right: -6 }} width={100} height={0} src={RightCornerImage} />
            <Image style={{ position: "fixed", top: -6, left: -6 }} width={100} height={0} src={LeftCornerImage} />
            <Box sx={{ display: { md: "block", lg: "block" }, }}>
              <Image style={{zIndex: 2, position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)" }} width={0} height={40} src={BottomImage} />
            </Box>
            <Box sx={{ display: { md: "none", lg: "block" }, }}>
              <Image style={{zIndex: 2, position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)" }} width={0} height={70} src={BottomImage} />
            </Box>
          </Box> */}
          <button
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: "35px",
              height: "35px",
              backgroundColor: '#450505',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 12px 2px rgba(44, 44, 44, 0.242)",
              cursor: "pointer",
              zIndex: "10000"
            }}
          >
            <ScrollTop className={styles.scrollTop}
              width={20} />
          </button>
          <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", margin: { md: "0", xs: "30px 0 0 0" },
            padding: { md: "0", xs: "0 10px 0 10px" }
          }}>

            <Modal open={detailImagesModal}
              onClose={() => setDetailImagesModal(false)}>
              <Box sx={style} >
                <Box className={styles.detailImages} sx={{
                  display: "grid", gridColumnGap: "10px", gridAutoFlow: "column",
                  overflowX: "scroll", scrollSnapType: "x mandatory",
                  gridAutoColumns: { md: "70%", xs: "45%" }
                }}>
                  {detailImages.map((i) => (
                    <Box key={i._id} sx={{ width: { md: "300px", xs: "180px" } }}>
                      <img style={{ width: "100%" }} src={`${BASE_URL}/src/uploads/${i.image}`} alt={i.image} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Modal>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Instagram onClick={() => NavigatingSocial("https://www.instagram.com/nurjaz_brand/")} data-aos="zoom-in-right" data-aos-delay="0" style={stylesImage} alt="Logo" width={27} />
              <WhatsApp onClick={() => NavigatingSocial("https://wa.me/996702085452/")} data-aos="zoom-in-right" data-aos-delay="100" style={stylesImage} alt="Logo" width={27} />
              <Phone onClick={() => { window.location.href = 'tel:+996999444072'; }} data-aos="zoom-in-right" data-aos-delay="200" style={stylesImage} alt="Logo" width={27} />
              <Location onClick={() => NavigatingSocial("https://go.2gis.com/cmxd2")} data-aos="zoom-in-right" data-aos-delay="300" style={stylesImage} alt="Logo" width={27} />
            </Box>
            <Box sx={{ paddingLeft: "0px" }}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "absolute", left: { md: 40, xs: 20 }, top: { md: -80, xs: -90 } }}>
                  <Ellips style={{}} />
                </Box>
                <Box sx={{ position: "absolute", top: { md: 100, xs: 200 }, right: { md: -50, xs: 0 } }}>
                  <Square style={{}} />
                </Box>
                <Box sx={{ position: "absolute", top: 200, right: 250 }}>
                  <Trangle style={{}} />
                </Box>
              </Box>

              <Box sx={{ marginLeft: { md: "100px", xs: "10px" } }}>
                <Typography sx={{ fontSize: { md: "33px", xs: "20px" }, fontWeight: "500", width: { md: "450px", xs: "auto" }, }}>
                  Швейное производство полного цикла в Бишкеке
                </Typography>
                <Box sx={{ paddingLeft: "50px" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: { md: "450px", xs: "100%" },
                      padding: "5px 0 5px 10px",
                      fontWeight: 300,
                      borderLeft: "2px solid #450505",
                    }}
                  >
                    Швейная фабрика NURJAZ BRAND специализируется на пошиве одежды первого,
                    второго и третьего слоя. Мы производим продукцию "под ключ" с отправкой во все страны СНГ
                  </Typography>
                  {/* <Typography sx={{
                    fontSize: { md: "16px", xs: "14px" }, fontWeight: "300", width: { md: "450px", xs: "auto" },
                    padding: "5px 0 5px 10px", fontWeight: 300, borderLeft: "2px solid #450505",
                  }}>
                    Швейная фабрика NURJAZ BRAND специализируется на пошиве одежды первого,
                    второго и третьего слоя. Мы производим продукцию "под ключ" с отправкой во все страны СНГ
                  </Typography> */}
                </Box>
              </Box>

            </Box>
            <Box sx={{ display: { md: "block", xs: "none" } }}>
              <Image data-aos="fade-down-left" layout="responsive" width={700} height={0} src={"/assets/images/bannerImage.png"} />
            </Box>
          </Box>
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <Image data-aos="fade-down-left" layout="responsive" width={700} height={0} src={"/assets/images/bannerImage.png"} />
          </Box>

          {/*  */}

          <Box id="galery" sx={{ margin: "100px auto" }}>
            <Typography sx={{ fontSize: { md: "33px", xs: "28px" }, fontWeight: "500", textAlign: "center", margin: "0 0 50px 0" }}>Что мы предлагаем ?</Typography>
            <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { md: "auto auto auto auto", xs: "auto" }, zIndex: 1, margin: { md: "100px", xs: "50px" } }}>
                {offoringCards.map((e, index) => (
                  <Box data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-once="true" sx={{
                    margin: { md: "0 10px", xs: "20px 0" },
                    ":hover": { transform: "translateY(-6px) !important", transition: "0.25s ease all" },

                  }} key={"onw" + index}>
                    <img style={{ border: "1px #e2e2e2 solid", borderRadius: "150px 150px 0 0", }}
                      src={e.image} alt={`image-${index}`} />

                    <Typography sx={{ textAlign: "center", fontSize: { md: "18px", xs: "14px" }, fontWeight: 500 }}>{e.title}</Typography>
                    <Typography sx={{ width: "280px", textAlign: "center", fontWeight: 300, fontSize: { md: "18px", xs: "13px" } }}>{e.des}</Typography>
                  </Box>
                ))}
              </Box>
              <DrawingLeft width={200}
                // Ensures the image loads eagerly
                style={{ position: "absolute", top: -50, left: 0 }} />
              <DrawingRight width={200} style={{ position: "absolute", right: 0, bottom: -80, zIndex: -1 }} />
            </Box>
          </Box>

          <Box sx={{ margin: { md: "100px auto", xs: "0" }, }}>
            <Typography sx={{ fontSize: { md: "33px", xs: "28px" }, fontWeight: "500", textAlign: "center", margin: "0 0 50px 0" }}>Что мы шьём ?</Typography>
            <Box sx={{ display: { md: "flex", xs: "block" }, justifyContent: "center", padding: { md: "100px", xs: "15px" } }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { md: "auto auto auto auto", xs: "auto auto" }, zIndex: 1, }}>
                {mainCards.map((e, index) => (
                  <Box onClick={() => showDetailImagesHandle(e)} key={e._id} data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                    sx={{
                      position: "relative", margin: "10px",
                      ":hover": { transform: "translateY(-4px) !important", transition: "0.15s ease all" }
                    }}>
                    {/* <Box sx={{
                      margin: "10px", border: "1px #e2e2e2 solid", borderRadius: "20px", 
                    }}
                      component="img" src={e.image} alt="image1" /> */}
                    <Box sx={{ width: "100%" }}>
                      <Image style={{ border: "1px #e2e2e2 solid", borderRadius: "20px" }} src={`${BASE_URL}/src/uploads/${e.image}`} width={0} height={0} layout="responsive" />
                    </Box>
                    <Box sx={{ borderRadius: "0 0 20px 20px", width: "100%", position: "absolute", bottom: 4, background: "#0000003e", padding: { md: "0 10px", xs: "0 4px" } }}>
                      <Typography sx={{ textAlign: "center", fontSize: { md: "18px", xs: "13px" }, fontWeight: 500, color: "white" }}>{e.title}</Typography>
                      <Typography sx={{ width: "100%", fontSize: { md: "14px", xs: "12px" }, textAlign: "center", fontWeight: 300, color: "white" }}>Товары: {e.count.length || 0}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* about company */}

          <Box id="about-company" sx={{ display: { md: "flex", xs: "block" }, justifyContent: "center", gap: "50px", margin: { md: "70px 0", xs: "20px 0 70px 0" } }}>
            <Box>
              <Typography sx={{ color: "#450505", fontSize: { md: "30px", xs: "22px" }, fontWeight: "500", textAlign: { xs: "center" } }}>О компании</Typography>
              <Typography sx={{ borderLeft: "2px solid #450505", fontSize: { md: "20px", xs: "16px" }, fontWeight: 300, width: { md: "585px", xs: "auto" }, padding: "0 0 0 15px", textAlign: { xs: "center" } }}>
                Мы специализируемся на производстве качественной текстильной продукции, включая повседневную, специальную
                и корпоративную одежду. Наша команда предлагает полный
                цикл — от разработки дизайна до упаковки готовых изделий, используя современные технологии и материалы.</Typography>

              <Box data-aos="fade-right" sx={{ padding: "20px", boxShadow: "0px 0px 12px 2px rgba(21, 21, 21, 0.2)", margin: { md: "40px 0 0 0", xs: "40px 10px 10px 10px" }, position: "relative", left: { md: 100, xs: 0 }, background: "white" }}>
                <Typography sx={{ color: "#450505", fontSize: "25px", fontWeight: "500" }}>Наши преимущества:</Typography>
                <Box component="li" sx={{ fontSize: "18px", fontWeight: 300, padding: "6px 0" }}>Высокое качество на каждом этапе производства.</Box>
                <Box component="li" sx={{ fontSize: "18px", fontWeight: 300, padding: "6px 0" }}>Индивидуальный подход к каждому заказу.</Box>
                <Box component="li" sx={{ fontSize: "18px", fontWeight: 300, padding: "6px 0" }}>Современные технологии для точности и скорости.</Box>
                <Box component="li" sx={{ fontSize: "18px", fontWeight: 300, padding: "6px 0" }}>Своевременное выполнение заказов любого объёма.</Box>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "block" }, justifyContent: "center" }}>
              <Box sx={{}} component="img" src={"/assets/images/companyImage.png"} alt="company image" />
            </Box>
          </Box>

          {/* result statics */}

          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "80px" }}>

            {/* 1 */}
            <Box data-aos="fade-up" sx={{
              background: "#450505", display: "flex", justifyContent: "space-between", alignItems: "center",
              width: { md: "650px", xs: "90%" }, padding: { md: "20px 30px", xs: "15px 25px" }, borderRadius: "100px", position: "relative"
            }}>
              <Box sx={{
                position: "absolute", top: -40, right: { md: 150, xs: 80 }, boxShadow: "0px 0px 12px 2px rgba(21, 21, 21, 0.503)", display: "flex",
                justifyContent: "center", alignItems: "center", background: "black", width: { md: "110px", xs: "80px" },
                height: { md: "110px", xs: "80px" }, borderRadius: "100%"
              }}>
                <Typography sx={{ color: "white", fontSize: { md: "35px", xs: "25px" }, fontWeight: 600 }}> <CountUp start={0} end={35} duration={1}>35</CountUp>
                  <Box component="span" sx={{ position: "relative", top: -10 }} >+</Box>
                </Typography>
              </Box>
              <Typography sx={{ fontSize: { md: "24px" }, color: "white" }}>Квалифицированных <br /> сотрудников</Typography>
              <UsersIcon component="img" alt="user icon" />
            </Box>
            {/* 2 */}
            <Box data-aos="fade-up" sx={{
              background: "#450505", display: "flex", justifyContent: "space-between", alignItems: "center",
              width: { md: "650px", xs: "90%" }, padding: { md: "20px 30px", xs: "15px 25px" }, borderRadius: "100px", position: "relative"
            }}>
              <Box sx={{
                position: "absolute", top: -40, left: { md: 150, xs: 90 }, boxShadow: "0px 0px 12px 2px rgba(21, 21, 21, 0.503)", display: "flex",
                justifyContent: "center", alignItems: "center", background: "black", width: { md: "110px", xs: "80px" },
                height: { md: "110px", xs: "80px" }, borderRadius: "100%"
              }}>
                <Typography sx={{ color: "white", fontSize: { md: "35px", xs: "25px" }, fontWeight: 600 }}>120
                  <Box component="span" sx={{ position: "relative", top: -10 }} >+</Box>
                </Typography>
              </Box>
              <Clients component="img" alt="client" />
              <Typography sx={{ fontSize: { md: "24px" }, color: "white" }}>Довольных клиента</Typography>
            </Box>
            {/* 3 */}
            <Box data-aos="fade-up" sx={{
              background: "#450505", display: "flex", justifyContent: "space-between", alignItems: "center",
              width: { md: "650px", xs: "90%" }, padding: { md: "20px 30px", xs: "15px 25px" }, borderRadius: "100px", position: "relative"
            }}>
              <Box sx={{
                position: "absolute", top: -40, right: { md: 150, xs: 80 }, boxShadow: "0px 0px 12px 2px rgba(21, 21, 21, 0.503)", display: "flex",
                justifyContent: "center", alignItems: "center", background: "black", width: { md: "110px", xs: "80px" },
                height: { md: "110px", xs: "80px" }, borderRadius: "100%"
              }}>
                <Typography sx={{ color: "white", fontSize: { md: "35px", xs: "25px" }, fontWeight: 600 }}>3500
                  <Box component="span" sx={{ position: "relative", top: -10 }} >+</Box>
                </Typography>
              </Box>
              <Typography sx={{ fontSize: { md: "24px" }, color: "white" }}>Одежды создано</Typography>
              <DoneWears component="img" alt="done wears" />
            </Box>

          </Box>

          {/* steps*/}
          <Box id="steps" sx={{ display: "flex", justifyContent: "center", margin: "110px 0 0 0" }} >
            <Box>
              <Typography sx={{ fontSize: "30px", fontWeight: "500", textAlign: "center" }}>Этапы работы</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "200", textAlign: "center" }}>Схема работы "под ключ"</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", }}>
            <Box sx={{
              // display: "flex", justifyContent: "center", gap: "", 
              margin: "80px 0"
            }}>

              <Box>
                {/* step 1 */}
                <Box data-aos="fade-up" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", position: "relative" }}>
                  <Box component="img" src="/assets/images/step1.png" alt="step 1" />
                  <Box >
                    <Typography sx={{ color: "#FF746C", ...styleTitleDes }}>Ваша модель</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Вы отправляете фотографии желаемой модели</Typography>
                  </Box>
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step1.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  {/* <Box  component="img" src="/assets/images/step1.svg" /> */}
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(10deg)", position: "absolute", top: 65, right: 175 }} component="img" src="/assets/images/nextStep.svg" />
                </Box>
                {/* step 2 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: { md: 75, xs: 0 }, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "25px 0 0 0" }}>
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(85deg)", position: "relative", top: 65, left: 180 }} component="img" src="/assets/images/nextStep.svg" />
                  {/* <Box component="img" src="/assets/images/step2.svg" /> */}
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step2.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  <Box >
                    <Typography sx={{ color: "#98A0EF", ...styleTitleDes }}>Разработка лекала</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Конструкторы <br /> разрабатывают лекала <br /> вашей модели</Typography>
                  </Box>
                  <Box component="img" src="/assets/images/step2.png" alt="step 2" />
                </Box>
                {/* step 3 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "50px 0 0 0" }}>
                  <Box component="img" src="/assets/images/step3.png" alt="step 3" />
                  <Box >
                    <Typography sx={{ color: "#FFC669", ...styleTitleDes }}>Пошив образца</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Наш технолог шьёт   пробный  образец</Typography>
                  </Box>
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step3.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  {/* <Box component="img" src="/assets/images/step3.svg" /> */}
                  <Box sx={{ display: { md: "block", xs: "none" }, position: "relative", top: 80, right: 175 }} component="img" src="/assets/images/nextStep.svg" alt="step next" />
                </Box>
                {/* step 4 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: { md: 75, xs: 0 }, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "45px 0 0 0" }}>
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(85deg)", position: "relative", top: 65, left: 180 }} component="img" src="/assets/images/nextStep.svg" alt="step next1" />
                  {/* <Box component="img" src="/assets/images/step4.svg" /> */}
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step4.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  <Box >
                    <Typography sx={{ color: "#30495E", ...styleTitleDes }}>Отправка образца</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Мы отправляем Вам образец для утверждения</Typography>
                  </Box>
                  <Box component="img" src="/assets/images/step4.png" />
                </Box>

              </Box>
              {/* ------- */}
              <Box>
                {/* step 5 */}
                <Box data-aos="fade-up" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginTop: { xs: "40px" } }}>
                  <Box component="img" src="/assets/images/step5.png" alt="step 1" />
                  <Box >
                    <Typography sx={{ color: "#E6364F", ...styleTitleDes }}>Закупка ткани</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Закупаем ткани, фурнитуры с Вашим онлайн-участием</Typography>
                  </Box>
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step5.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  {/* <Box component="img" src="/assets/images/step5.svg" /> */}
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(10deg)", position: "relative", top: 65, right: 175 }} component="img" alt="step image" src="/assets/images/nextStep.svg" />
                </Box>
                {/* step 6 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: { md: 75, xs: 0 }, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "25px 0 0 0" }}>
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(85deg)", position: "relative", top: 65, left: 180 }} component="img" alt="step image" src="/assets/images/nextStep.svg" />
                  {/* <Box component="img" src="/assets/images/step6.svg" /> */}
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step6.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  <Box >
                    <Typography sx={{ color: "#8BCDE8", ...styleTitleDes }}>Пошив партии</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Запуск производства под контролем наших технологов</Typography>
                  </Box>
                  <Box component="img" src="/assets/images/step6.png" alt="step image" />
                </Box>
                {/* step 7 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "50px 0 0 0" }}>
                  <Box component="img" src="/assets/images/step7.png" alt="step image" />
                  <Box >
                    <Typography sx={{ color: "#FFD25C", ...styleTitleDes }}>Контроль качества</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Отдел ОТК проверяет на брак и готовит к отправке товар</Typography>
                  </Box>
                  {/* <Box component="img" src="/assets/images/step7.svg" /> */}
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step7.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  <Box sx={{ display: { md: "block", xs: "none" }, position: "relative", top: 80, right: 175 }} component="img" alt="step image" src="/assets/images/nextStep.svg" />
                </Box>
                {/* step 8 */}
                <Box data-aos="fade-up" sx={{ position: "relative", left: { md: 75, xs: 0 }, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "45px 0 0 0" }}>
                  <Box sx={{ display: { md: "block", xs: "none" }, transform: "rotate(85deg)", position: "relative", top: 65, left: 180 }} component="img" alt="step image" src="/assets/images/nextStep.svg" />
                  {/* <Box component="img" src="/assets/images/step8.svg" /> */}
                  <Box sx={{ width: { md: "120px", xs: "60px" } }}>
                    <Image src={"/assets/images/step8.svg"} layout="responsive" width={20} height={0} />
                  </Box>
                  <Box >
                    <Typography sx={{ color: "#96D7A5", ...styleTitleDes }}>Отправка партии</Typography>
                    <Typography sx={{ ...styleStepDescription }}>Партия продукции отправляется клиенту</Typography>
                  </Box>
                  <Box component="img" src="/assets/images/step8.png" alt="step image" />
                </Box>

              </Box>
            </Box>
          </Box>

          <Box id="contact" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "80px" }}>
            <Typography sx={{ textAlign: "start", fontSize: "30px", fontWeight: "500", marginBottom: "40px" }}>
              Расположение нашей компании на карте
            </Typography>
            <Box sx={{ display: "grid", transform:{ md: "translate(0%)", lg:"translate(-20%)"}, gridTemplateColumns: { md: "70% 70%" }, gap: "40px" }}>
              {/* map */}
              <LazyYandexMap />
              {/* <div style={{
                position: "relative", overflow: "hidden"
              }}>
                <a href="https://yandex.com/maps/10309/bishkek/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Bishkek</a>
                <a href="https://yandex.com/maps/10309/bishkek/house/Y00YcAVmQUQCQFpofXR5cnhlbA==/?ll=74.627481%2C42.882918&utm_medium=mapframe&utm_source=maps&z=18.16" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px", }}>Yandex Maps: search for places, transport, and routes</a>
                <iframe src="https://yandex.com/map-widget/v1/?ll=74.627481%2C42.882918&mode=whatshere&whatshere%5Bpoint%5D=74.626787%2C42.883494&whatshere%5Bzoom%5D=17&z=18.16" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe>
              </div> */}
              {/* Request  */}
              <Box sx={{ padding: { xs: "0 10px" } }}>
                <Typography sx={{ fontSize: "24px", fontWeight: 400, marginBottom: "25px", color: "#450505", }}>Создайте заявку</Typography>
                <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                  <TextField error={validation.fullName} value={valueRequest.fullName} onChange={getRequest} name="fullName" sx={{}} id="outlined-basic" label="Введите ФИО" variant="outlined" />
                  <TextField error={validation.phone} value={valueRequest.phone} onChange={getRequest} name="phone" id="outlined-basic" label="Введите Тел. номер" variant="outlined" />
                </Box>
                <Box id="outlined-basic" value={valueRequest.description} onChange={getRequest} name="description"
                  sx={{ border: `1px solid ${validation.description ? "red" : "gray"}`, width: "100%", height: "100px", borderRadius: "15px", padding: "15px", resize: "none" }} component="textarea" placeholder="Ваше сообщение" />
                {(validation.fullName || validation.phone || validation.description) && (<Typography sx={{ color: "red", fontSize: "14px" }}>Пожалуйста, заполните все поля!</Typography>)}
                <Button onClick={sendHandler} sx={{ background: "#450505", marginTop: "20px" }} variant="contained" >Отправить</Button>
              </Box>
            </Box>
          </Box>

        </main >
      </div >
    </>
  );
}


const styleStepDescription = {
  color: "#666666",
  textAlign: "center",
  width: "240px"
}
const styleTitleDes = {
  textAlign: "center"
}