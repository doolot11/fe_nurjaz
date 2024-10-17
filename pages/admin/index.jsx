import { Box, Button, Modal, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '..';

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
    const [value, setValue] = React.useState(0);
    const [requests, setRequests] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    async function getRequests() {
        try {
            const response = await fetch(`${BASE_URL}api/requests`);

            const result = await response.json();
            setRequests(result)
        } catch (error) {
            setError('An error occurred during sign-in');
        }
    }

    useEffect(() => {
        getRequests()
    }, [])
    console.log(requests, "requests");

    const [open, setOpen] = React.useState({ modal: false, data: {} });

    function isOpenDeleteModal(e) {
        setOpen({ modal: true, data: e });
    }

    function handleClose() {
        setOpen({ modal: false, data: {} });
    }
    console.log(open, "open");

    async function deleteRequest(params) {
        
    }

    return (
        <Box>
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
                <TabPanel value={value} index={0}>
                    <Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                            <Typography sx={{ ...titleStyle }}>ФИО</Typography>
                            <Typography sx={{ ...titleStyle }}>Номер</Typography>
                            <Typography sx={{ ...titleStyle }}>Описание</Typography>
                            <Typography sx={{ ...titleStyle }}>Время</Typography>
                            <Typography sx={{ ...titleStyle }}>Действия</Typography>
                        </Box>
                        {requests.map((i) => (
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #a2a2a2", padding: "5px 0" }} key={i._id}>
                                <Typography>{i.fullName}</Typography>
                                <Typography>{i.phone}</Typography>
                                <Typography>{i.description}</Typography>
                                <Typography>{i.createdAt?.slice(0, -5)}</Typography>
                                <Button onClick={() => isOpenDeleteModal(i)} variant='contained' color="error" sx={{ width: "70px", fontSize: "10px", height: "30px" }}>Удалить</Button>
                            </Box>
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two Content
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