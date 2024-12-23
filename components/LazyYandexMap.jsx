import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const LazyYandexMap = () => {
    const mapContainerRef = useRef(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (mapContainerRef.current) {
                const rect = mapContainerRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && !isMapLoaded) {
                    // Загружаем карту
                    setIsMapLoaded(true);
                    const script = document.createElement("script");
                    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
                    script.async = true;
                    script.onload = () => {
                        const ymaps = window.ymaps;
                        ymaps.ready(() => {
                            new ymaps.Map("yandex-map", {
                                center: [42.882918, 74.627481], // Координаты
                                zoom: 18,
                                controls: ["zoomControl", "fullscreenControl"],
                            });
                        });
                    };
                    document.head.appendChild(script);
                    window.removeEventListener("scroll", handleScroll);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMapLoaded]);

    return (
        <div ref={mapContainerRef} style={{ height: "400px", width: "100%", position: "relative" }}>
            {isMapLoaded ? (
                // <div style={{
                //     position: "relative", overflow: "hidden"
                // }}>
                //     <a href="https://yandex.com/maps/10309/bishkek/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Bishkek</a>
                //     <a href="https://yandex.com/maps/10309/bishkek/house/Y00YcAVmQUQCQFpofXR5cnhlbA==/?ll=74.627481%2C42.882918&utm_medium=mapframe&utm_source=maps&z=18.16" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px", }}>Yandex Maps: search for places, transport, and routes</a>
                //     <iframe src="https://yandex.com/map-widget/v1/?ll=74.627481%2C42.882918&mode=whatshere&whatshere%5Bpoint%5D=74.626787%2C42.883494&whatshere%5Bzoom%5D=17&z=18.16" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe>
                // </div>
                <>
                    {/* <Box sx={{ display: { md: "none", lg: "flex" } }}>
                        <div style={{ position: "relative", overflow: "hidden" }}>
                            <a href="https://yandex.com/maps?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Яндекс Карты</a>
                            <a href="https://yandex.com/maps/105947/chuy-province/house/Y00YcAJhTUIEQFpofXV0cnRjZg==/?ll=74.651811%2C42.953723&utm_medium=mapframe&utm_source=maps&z=20.12" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px", }}>Алма-Атинская улица, 58 — Яндекс Карты</a>
                            <iframe src="https://yandex.com/map-widget/v1/?ll=74.651811%2C42.953723&mode=whatshere&whatshere%5Bpoint%5D=74.651437%2C42.953800&whatshere%5Bzoom%5D=17&z=20.12" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe>
                        </div>
                    </Box> */}
                    <Box sx={{  }}>
                        <div style={{ position: "relative", overflow: "hidden" }}>
                            <a href="https://yandex.com/maps?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}>Яндекс Карты</a>
                            <a href="https://yandex.com/maps/105947/chuy-province/house/Y00YcAJhTUIEQFpofXV0cnRjZg==/?ll=74.651811%2C42.953723&utm_medium=mapframe&utm_source=maps&z=20.12" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px", }}>Алма-Атинская улица, 58 — Яндекс Карты</a>
                            <iframe src="https://yandex.com/map-widget/v1/?ll=74.651811%2C42.953723&mode=whatshere&whatshere%5Bpoint%5D=74.651437%2C42.953800&whatshere%5Bzoom%5D=17&z=20.12" width="100%" height="400" frameBorder="1" allowFullScreen={true} style={{ position: "relative" }}></iframe>
                        </div>
                    </Box>
                </>
    ) : (
        <p style={{ textAlign: "center" }}>Загрузка карты...</p>
    )
}
        </div >
    );
};

export default LazyYandexMap;
