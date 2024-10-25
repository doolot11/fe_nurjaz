import { Box, Button, Modal, Pagination, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material'
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
                <Box sx={{ padding: { md: "20px", xs: "0" } }}>
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

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    // height: 500,
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
            const response = await fetch(`${BASE_URL}/requests?page=${page}`);

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
            const response = await fetch(`${BASE_URL}/requests/delete`, {
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
            const response = await fetch(`${BASE_URL}/requests/isAnswered`, {
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
    const [isOpenModalEditMainPost, setIsOpenModalEditMainPost] = useState({ modal: false, data: {} })
    const [isCreateMainCard, setIsCreateMainCard] = useState(false)
    const [detailCard, setDetailCard] = useState({ data: {}, modal: false })
    const [isAddImageDetailCardModal, setAddImageDetailCardModal] = useState({ data: {}, modal: false })



    function isOpenDeleteMainPostHandle(e) {
        setIsOpenModalDeleteMainPost({ data: e, modal: true })
    }
    function isOpenEditMainPostHandle(e) {
        setIsOpenModalEditMainPost({ data: e, modal: true })
        console.log(e, "isOpenModalEditMainPost");

    }

    async function deleteMainPost() {
        try {
            const res = await fetch(`${BASE_URL}/content/mainCard/delete`, {
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

    const getNewImageDetailCard = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsOpenModalEditMainPost((prev) => ({ ...prev, data: { ...prev.data, newImage: file } }));
        }
    };
    async function confirmEditMainPost() {
        try {
            const formData = new FormData();
            formData.append('title', isOpenModalEditMainPost.data.title);
            if (isOpenModalEditMainPost.data.newImage) {
                formData.append('image', isOpenModalEditMainPost.data.newImage);
            }
            formData.append('_id', isOpenModalEditMainPost.data._id);
            const res = await fetch(`${BASE_URL}/content/mainCard/edit`, {
            // const res = await fetch(`http://localhost:3001/content/mainCard/edit`, {
                method: "POST",
                body: formData
            })
            if (res.ok) {
                setMainCards((e) =>
                    e.filter((i) => i._id !== isOpenModalEditMainPost.data._id)
                )
                setIsOpenModalEditMainPost({ modal: false })
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
            const response = await fetch(`${BASE_URL}/content/mainCard`, {
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
            const response = await fetch(`${BASE_URL}/content/detailCard`, {
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

    const [deleteDetailImage, setDeleteDetailImage] = useState({ modal: false, data: {} })
    function deleteDetailImageHandle(i) {
        setDeleteDetailImage({ data: i, modal: true })
    }

    async function confirmDeleteDetailImage() {
        try {
            const res = await fetch(`${BASE_URL}/content/detailCard/delete`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: deleteDetailImage.data._id })
            })
            if (res.ok) {
                setDetailImages((e) =>
                    e.filter((i) => i._id !== deleteDetailImage.data._id)
                )
                setDeleteDetailImage({ modal: false })
                toast.success("Успешно!")
            }
        } catch (error) {
            toast.error("Ошибка!")
        }
    }

    return (
        <Box>
            <Modal open={deleteDetailImage.modal} onClose={() => setDeleteDetailImage({ modal: false })}>
                <Box sx={style}>
                    <Box>
                        <Typography>Вы хотите удалить?</Typography>
                        <Box>
                            <Button onClick={confirmDeleteDetailImage} color="error">Да</Button>
                            <Button onClick={() => setDeleteDetailImage({ modal: false })}>Нет</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

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
                    {/* <Box sx={{ width: "100%",  }}> */}
                    <Box sx={{
                        // padding: "0 10px",
                        display: "grid", gridColumnGap: "10px", gridAutoFlow: "column",
                        overflowX: "scroll", scrollSnapType: "x mandatory",
                        gridAutoColumns: { md: "70%", xs: "50%" }
                    }}>

                        {detailImages.map((i, index) => (
                            <Box key={i._id} sx={{ position: "relative", width: { md: "300px", xs: "200px" }, scrollSnapAlign: "start", transition: "all 0.2s" }}>
                                <Box sx={{ position: "absolute" }}><Image onClick={() => deleteDetailImageHandle(i)}
                                    style={{ cursor: "pointer" }} width={25} height={25} src="/assets/icons/delete.svg" /> </Box>
                                <img style={{ width: "100%" }} src={`${BASE_URL}/src/uploads/${i.image}`} alt={i.image} />
                            </Box>
                        ))
                        }
                    </Box>
                    <Button variant='outlined' onClick={addImageDetailCardModal}>Добавить фото</Button>
                </Box>
                {/* </Box> */}

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
            {/* edit modal */}
            <Modal
                open={isOpenModalEditMainPost.modal}
                onClose={() => setIsOpenModalEditMainPost({ modal: false })}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={{ ...style, display: "flex", justifyContent: "center" }}>
                    {isOpenModalEditMainPost.modal && <Box>
                        <Typography>Редактировать пост</Typography>
                        <form onSubmit={handleSubmit} action="">
                            <Box sx={{ position: "relative", width: { md: "300px", xs: "150px" } }}>
                                {isOpenModalEditMainPost.data?.newImage ?
                                    <img
                                        src={URL.createObjectURL(isOpenModalEditMainPost.data.newImage)}
                                        alt="Selected"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px',
                                        }}
                                    /> : <img
                                        src={`${BASE_URL}/src/uploads/${isOpenModalEditMainPost.data.image}`}
                                        alt="Selected"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '8px',
                                            marginTop: '10px',
                                        }}
                                    />}
                                <Button variant='outlined' component="label" sx={{ position: "absolute", bottom: 0, left: 0 }}>Изменить
                                    <input id="newImageDetail" type="file" hidden accept="image/*"
                                        onChange={getNewImageDetailCard} />
                                </Button>
                            </Box>
                        </form>
                        <TextField onChange={(e) => setIsOpenModalEditMainPost((prev) => ({ ...prev, data: { ...prev.data, title: e.target.value } }))} value={isOpenModalEditMainPost.data.title} />
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <Button onClick={() => setIsOpenModalEditMainPost({ modal: false })} variant='outlined' >Отмена</Button>
                            <Button onClick={confirmEditMainPost} variant='contained' color="error">Сохранить</Button>
                        </Box>
                    </Box>}
                </Box>
            </Modal >
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
                        {/* <Tab value={2} {...a11yProps(2)} label="Item Three" /> */}
                    </Tabs>
                </Box>
                {/* requests */}
                <TabPanel sx={{}} value={value} index={0}>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead sx={{ "td, th": { padding: "3px" } }}>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell align="left">Номер</TableCell>
                                    <TableCell align="left">Описание</TableCell>
                                    <TableCell align="left">Время</TableCell>
                                    <TableCell align="left">Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((row) => (
                                    <TableRow key={row._id} sx={{ background: `${row.isAnswered ? "#f4dc7d" : "none"}`, "td, th": { padding: "3px" } }} >
                                        <TableCell component="th">
                                            {row.fullName}
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap" }} align="left">{row.phone}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{moment(row.createdAt).format('DD-MM-YYYY HH:mm')}</TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ display: "flex", alignItems: "left", gap: "5px" }}>
                                                <Button onClick={() => isOpenDeleteModal(row)} variant='contained' color="error" sx={{ width: "70px", fontSize: "10px", height: "30px" }}>Удалить</Button>
                                                <Button onClick={() => isOpenAnsweredModal(row)} variant='contained' color="success"
                                                    sx={{ width: "80px", fontSize: "10px", height: "30px" }}>Прочитано</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={2}>
                        <Pagination onChange={onChangePagination} count={countReqPage / 30} page={+router.query.page} color="secondary" />
                    </Stack>
                </TabPanel>
                {/* content */}
                <TabPanel sx={{ ".css-19kzrtu": { padding: "0" } }} value={value} index={1}>
                    <Box>
                        <Button onClick={() => setIsCreateMainCard(!isCreateMainCard)} variant='contained'>Создать пост</Button>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
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
                                        <Box sx={{ position: "absolute", left: 35 }}><Image onClick={() => isOpenEditMainPostHandle(e)} style={{ cursor: "pointer" }} width={25} height={25} src="/assets/icons/edit.svg" /> </Box>
                                        <Box sx={{ width: "auto" }}>
                                            <img onClick={() => openDetailCardHandle(e)} style={{ width: "100%", height: "auto", objectFit: "cover" }} src={BASE_URL + "/src/uploads/" + e.image} alt="" />
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
        </Box >
    )
}

export default index

const titleStyle = {
    color: "green",
    fontWeight: 500,
    fontSize: "20px"
}