import Header from "@/components/Header";
import "@/styles/globals.css";
import { Box } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Layout({ children }) {
  const router = useRouter();
  return <Box>
    <Header />
    {children}
    <Footer />
  </Box>

}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Customize the animation duration
      once: false, // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <Box>
      <Head>
        <link rel="icon" type="image/png" href={"/assets/icons/favicon.png"} />
        <title>Nurjaz Brand</title>
      </Head>
      <ToastContainer position="top-center"
        autoClose={1200}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Box>
  )
}
