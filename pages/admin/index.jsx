import { Box, Button, Modal, Pagination, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '..';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import moment from 'moment';
import Image from 'next/image';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function index() {
    const [value, setValue] = useState(0);
    const [countReqPage, setCountReqPage] = useState(0);
    const [requests, setRequests] = useState([])
    const setParams = useSearchParams()
    const router = useRouter()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    async function getRequests(page) {
        try {
            const response = await fetch(`${BASE_URL}api/requests?page=${page}`);

            const { result, count } = await response.json();
            setRequests(result)
            setCountReqPage(count)
        } catch (error) {
            toast.error('An error occurred during sign-in');
        }
    }

    useEffect(() => {
        getRequests(1)
    }, [])
    // console.log(requests, "requests");

    const [open, setOpen] = React.useState({ modal: false, data: {} });
    const [openAnswered, setOpenAnswered] = useState({ modal: false, data: {} });

    function isOpenDeleteModal(e) {
        setOpen({ modal: true, data: e });
    }
    function isOpenAnsweredModal(e) {
        setOpenAnswered({ modal: true, data: e });
    }

    function handleClose() {
        setOpen({ modal: false, data: {} });
    }
    function handleCloseAnsweredModal() {
        setOpenAnswered({ modal: false, data: {} });
    }
    // console.log(requests, "requests");

    async function deleteRequest() {
        try {
            const response = await fetch(`${BASE_URL}api/requests/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: open.data._id }),
            });
            const result = await response.json();
            setRequests((e) =>
                e.filter((i) => i._id !== open.data._id)
            )
            setOpen({ modal: false, data: open.data });
            toast.success("Успешно удалено!")
        } catch (error) {
            toast.error("Произашло ошибка при удаление!")
        }
    }
    async function answeredRequest() {
        try {
            const response = await fetch(`${BASE_URL}api/requests/isAnswered`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: openAnswered.data._id }),
            });
            const result = await response.json();
            setRequests((e) =>
                e.map((i) => {
                    if (i._id === openAnswered.data._id) {
                        return { ...i, isAnswered: true }
                    } else {
                        return i
                    }

                })
            )
            setOpenAnswered({ modal: false, data: openAnswered.data });
            toast.success("Успешно удалено!")
        } catch (error) {
            toast.error("Произашло ошибка при удаление!")
        }
    }


    function onChangePagination(_, e) {
        let queries = '&limit=4'

        const currentPath = router.pathname;
        const query = { ...router.query, page: e };
        router.push({
            pathname: currentPath,
            query: query,
        });
        getRequests(e)
        // setParams(params)
    }

    // content main card
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDetailImage, setSelectedDetailImage] = useState(null);
    const [valueToSend, setValueToSend] = useState({});
    const [mainCards, setMainCards] = useState([]);
    const [isOpenModalDeleteMainPost, setIsOpenModalDeleteMainPost] = useState({ modal: false, data: {} })
    const [isCreateMainCard, setIsCreateMainCard] = useState(false)
    const [detailCard, setDetailCard] = useState({ data: {}, modal: false })
    const [isAddImageDetailCardModal, setAddImageDetailCardModal] = useState({ data: {}, modal: false })



    function isOpenDeleteMainPostHandle(e) {
        setIsOpenModalDeleteMainPost({ data: e, modal: true })
    }

    async function deleteMainPost() {
        try {
            const res = await fetch(`${BASE_URL}api/content/mainCard/delete`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: isOpenModalDeleteMainPost.data._id })
            })
            if (res.ok) {
                setMainCards((e) =>
                    e.filter((i) => i._id !== isOpenModalDeleteMainPost.data._id)
                )
                setIsOpenModalDeleteMainPost({ modal: false })
                toast.success("Успешно!")
            }
        } catch (error) {
            toast.error("Ошибка!")
        }
    }

    function getValueMainCard(e) {
        const { value, name } = e.target
        setValueToSend((e) => ({ ...e, [name]: value }))
    }
    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const handleDetailImageChange = (event) => {
        console.log("handleDetailImageChange");

        const file = event.target.files[0];
        if (file) {
            setSelectedDetailImage(file);
        }
    };

    // Handle form submission (for image upload)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your image upload logic here

    };
    // console.log('Image submitted', selectedImage);
    async function sendMainCardHandle() {
        try {
            const formData = new FormData();
            formData.append('title', valueToSend.title);
            formData.append('image', selectedImage);
            const response = await fetch(`${BASE_URL}api/content/mainCard`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                toast.success("Успешно!")
                getMainCards()
                setSelectedImage(null)
                setIsCreateMainCard(false)
                setValueToSend({ title: "" })
            }
            // const result = await response.json()

        } catch (error) {
            toast.error("Ошибка!")
        }
    }
    // console.log(detailCard);

    async function sendDetailCardHandle() {
        try {
            const formData = new FormData();
            formData.append('idMainCard', detailCard.data._id);
            formData.append('image', selectedDetailImage);
            const response = await fetch(`${BASE_URL}api/content/detailCard`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                toast.success("Успешно!")
                // getMainCards()
                setSelectedDetailImage(null)
            }
            // const result = await response.json()

        } catch (error) {
            toast.error("Ошибка!")
        }
    }


    async function getMainCards() {
        try {
            const response = await fetch(`${BASE_URL}api/content/mainCard`)
            const data = await response.json()
            setMainCards(data)
        } catch (error) {
            toast.error("Ошибка!")
        }
    }

    useEffect(() => {
        getMainCards()
    }, [])
    // console.log(mainCards, "mainCards");


    function addImageDetailCardModal(e) {
        setAddImageDetailCardModal({ data: e, modal: true })
    }

    function openDetailCardHandle(e) {
        setDetailCard({ data: e, modal: true })
    }

    const [detailImages, setDetailImages] = useState([])

    useEffect(() => {
        if (detailCard && detailCard.data && detailCard.data.count) {
            setDetailImages(detailCard.data.count)
        }
    }, [detailCard])
    console.log(detailCard.data, detailImages, "selectedDetailImage");
    // console.log(detailCard.data, "selectedDetailImage");

    return (
        <Box>

            <Modal open={isAddImageDetailCardModal.modal}
                onClose={() => setAddImageDetailCardModal({ modal: false })}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Button variant="contained" component="label" sx={{ mb: 2 }}> Выбрать фото (2:3)
                            <input id="detail" type="file" hidden accept="image/*" onChange={handleDetailImageChange} />
                        </Button>
                        {/* Show a preview if an image is selected */}
                        {selectedDetailImage && (
                            <Box sx={{ my: 2 }}>
                                <Typography variant="subtitle1">Image Preview:</Typography>
                                <img
                                    src={URL.createObjectURL(selectedDetailImage)}
                                    alt="Selected"
                                    style={{
                                        width: '300px',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        marginTop: '10px',
                                    }}
                                />
                            </Box>
                        )}
                    </form>
                    <Button variant='outlined' onClick={sendDetailCardHandle} >Добавить</Button>
                </Box>
            </Modal>

            <Modal open={detailCard.modal}
                onClose={() => setDetailCard({ modal: false })} >
                <Box sx={style}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { md: "auto auto auto auto", xs: "auto auto" }, overflowX: "scroll" }}>

                        {detailImages.map((i, index) => (
                            <Box key={i._id} sx={{ width: { md: "300px", xs: "150px" } }}>
                                <img style={{ width: "100%" }} src={`${BASE_URL}src/uploads/${i.image}`} alt={i.image} />
                            </Box>
                        ))
                        }
                    </Box>
                    <Button variant='outlined' onClick={addImageDetailCardModal}>Добавить фото</Button>
                </Box>
            </Modal>
            <Modal
                open={isOpenModalDeleteMainPost.modal}
                onClose={() => setIsOpenModalDeleteMainPost({ modal: false })}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography>Вы хотите удалить Пост?</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button onClick={() => setIsOpenModalDeleteMainPost({ modal: false })} variant='outlined' >Отмена</Button>
                        <Button onClick={deleteMainPost} variant='contained' color="error">Да</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open.modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Вы хотите удалить заявку?</Typography>
                    <Box>
                        <Typography>ФИО: {open.data.fullName}</Typography>
                        <Typography>Номер: {open.data.phone}</Typography>
                        <Typography>Описание: {open.data.description}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button onClick={handleClose} variant='outlined' >Отмена</Button>
                        <Button onClick={deleteRequest} variant='contained' color="error">Да</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openAnswered.modal}
                onClose={handleCloseAnsweredModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Вы хотите сделать заявку прочитано?</Typography>
                    <Box>
                        <Typography>ФИО: {openAnswered.data.fullName}</Typography>
                        <Typography>Номер: {openAnswered.data.phone}</Typography>
                        <Typography>Описание: {openAnswered.data.description}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button onClick={handleCloseAnsweredModal} variant='outlined' >Отмена</Button>
                        <Button onClick={answeredRequest} variant='contained' color="success">Прочитано</Button>
                    </Box>
                </Box>
            </Modal>
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value={0} {...a11yProps(0)} label="Завки" />
                        <Tab value={1} {...a11yProps(1)} label="Посты" />
                        <Tab value={2} {...a11yProps(2)} label="Item Three" />
                    </Tabs>
                </Box>
                {/* requests */}
                <TabPanel value={value} index={1}>
                    <Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                            <Typography sx={{ ...titleStyle }}>ФИО</Typography>
                            <Typography sx={{ ...titleStyle }}>Номер</Typography>
                            <Typography sx={{ ...titleStyle }}>Описание</Typography>
                            <Typography sx={{ ...titleStyle }}>Время</Typography>
                            <Typography sx={{ ...titleStyle }}>Действия</Typography>
                        </Box>
                        {requests?.map((i) => (
                            <Box sx={{
                                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #a2a2a2", padding: "5px 0",
                                background: `${i.isAnswered ? "#f4dc7d" : "none"}`
                            }} key={i._id}>
                                <Typography>{i.fullName}</Typography>
                                <Typography>{i.phone}</Typography>
                                <Typography>{i.description}</Typography>
                                <Typography>{moment(i.createdAt).format('DD-MM-YYYY HH:mm')}</Typography>
                                <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Button onClick={() => isOpenDeleteModal(i)} variant='contained' color="error" sx={{ width: "70px", fontSize: "10px", height: "30px" }}>Удалить</Button>
                                    <Button onClick={() => isOpenAnsweredModal(i)} variant='contained' color="success"
                                        sx={{ width: "80px", fontSize: "10px", height: "30px" }}>Прочитано</Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Stack spacing={2}>
                        <Pagination onChange={onChangePagination} count={countReqPage / 30} page={+router.query.page} color="secondary" />
                    </Stack>
                </TabPanel>
                {/* content */}
                <TabPanel value={value} index={0}>
                    <Box>
                        <Button onClick={() => setIsCreateMainCard(!isCreateMainCard)} variant='contained'>Создать пост</Button>
                    </Box>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Что мы шеьм?
                        </Typography>
                        {isCreateMainCard && <Box>

                            <form onSubmit={handleSubmit}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mb: 2 }}
                                >
                                    Выбрать фото (2:3)
                                    <input id="main"
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                {/* Show a preview if an image is selected */}
                                {selectedImage && (
                                    <Box sx={{ my: 2 }}>
                                        <Typography variant="subtitle1">Image Preview:</Typography>
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            alt="Selected"
                                            style={{
                                                width: '300px',
                                                height: 'auto',
                                                borderRadius: '8px',
                                                marginTop: '10px',
                                            }}
                                        />
                                    </Box>
                                )}
                            </form>
                            <Box>
                                <TextField name="title" value={valueToSend.title} label="Название" onChange={getValueMainCard} />
                            </Box>
                            <Button onClick={sendMainCardHandle}>Создать пост</Button>
                        </Box>}

                        <Box sx={{ display: { md: "flex", xs: "block" }, justifyContent: "center" }}>
                            <Box sx={{ width: "100vw", display: "grid", gridTemplateColumns: { md: "auto auto auto auto", xs: "auto auto" }, zIndex: 1, }}>
                                {mainCards?.map((e, index) => (
                                    <Box data-aos="fade-up" data-aos-anchor-placement="center-bottom"
                                        sx={{
                                            position: "relative", margin: "10px",
                                            ":hover": { transform: "translateY(-4px) !important", transition: "0.15s ease all" }
                                        }} key={"onw" + index}>
                                        <Box sx={{ position: "absolute" }}><Image onClick={() => isOpenDeleteMainPostHandle(e)} style={{ cursor: "pointer" }} width={25} height={25} src="/assets/icons/delete.svg" /> </Box>
                                        <Box sx={{ width: "auto" }}>
                                            <img onClick={() => openDetailCardHandle(e)} style={{ width: "100%", height: "auto", objectFit: "cover" }} src={BASE_URL + "src/uploads/" + e.image} alt="" />
                                            {/* <Image style={{ border: "1px #e2e2e2 solid", borderRadius: "20px" }} src={BASE_URL + "src/uploads/" + e.image} width={0} height={0} layout="responsive" /> */}
                                        </Box>
                                        <Box sx={{ borderRadius: "0 0 20px 20px", position: "absolute", bottom: 4, background: "#0000003e", padding: { md: "0 10px", xs: "0 4px" } }}>
                                            <Typography sx={{ textAlign: "center", fontSize: { md: "18px", xs: "13px" }, fontWeight: 500, color: "white" }}>{e.title}</Typography>
                                            <Typography sx={{ width: "100%", fontSize: { md: "14px", xs: "12px" }, textAlign: "center", fontWeight: 300, color: "white" }}>Товар: {e.count.length}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three Content
                </TabPanel>
            </Box>
        </Box>
    )
}

export default index

const titleStyle = {
    color: "green",
    fontWeight: 500,
    fontSize: "20px"
}