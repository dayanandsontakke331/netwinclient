import React, { useState } from 'react'
import { Button, Modal, Box, Typography, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import ContactTable from './ContactTable';

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


const Home = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("");
    const [contacts, setContacts] = useState([])
    const [id, setId] = useState("")
    const [refetch, setRefetch] = useState(0)
    let [filterBy, setFilterBy] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createContact = async () => {
        console.log("id", id)
        if (id) {
            let response = await axios.put(`http://localhost:1337/updateContact/${id}`, { data: { name, email, phone, type } })
            console.log("update response", response)
            setRefetch(Math.floor(Math.random() * 20) + 1)


            if (response?.data?.data && response?.data?.success) {
                setId("")
                setOpen(false)
                setName("")
                setEmail("")
                setPhone("")
                setType("")
                alert(response?.data?.message)
            }
            return
        }
        let response = await axios.post('http://localhost:1337/contact', { name, email, phone, type });
        console.log("response", response)
        setRefetch(Math.floor(Math.random() * 20) + 1)

        if (response?.data?.success) {
            setOpen(false)
            setName("")
            setEmail("")
            setPhone("")
            setType("")
            alert(response?.data?.message)
            return
        }
        alert(response?.data?.data?.message || "Something went wrong")

    }

    const fetchContacts = async (filterType = 'All') => {
        try {
            let response = await axios.get(`http://localhost:1337/contacts/all/${filterBy || "All"}`) // filterType
            setRefetch(Math.floor(Math.random() * 20) + 1)

            if (response?.data?.data) {
                setContacts(response?.data?.data)
            }
            console.log("response", response)
        } catch (error) {
            console.log("log", error)
        }
    }

    const filterBytype = (filter) => {
        console.log("filtrer", filter)
        setFilterBy(filter)
        fetchContacts()
    }

    useEffect(() => {
        fetchContacts()
    }, [refetch])

    console.log("contacts", contacts)

    const updateFn = (data) => {
        setId(data?._id)
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setType(data.type)
        setOpen(true)
    }

    const deleteContat = async (data) => {
        let response = await axios.delete(`http://localhost:1337/deleteContact/${data._id}`)
        setRefetch(Math.floor(Math.random() * 20) + 1)

        console.log("responsedz", response)
        if (response) {

        }
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                <Button sx={{ float: "right", margin: "5px" }} onClick={handleOpen} variant='outlined'>Add Contact</Button>
            </Box>

            <ContactTable data={contacts} updateFn={updateFn} deleteContat={deleteContat} filterBytype={filterBytype} />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // height: "100vh",
                        }}>

                        <Grid
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: 2,

                            }}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                Create Contact
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="name"
                                variant="outlined"
                                size='small'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Phone"
                                variant="outlined"
                                size='small'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Type"
                                variant="outlined"
                                size='small'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <Button variant='outlined' onClick={() => createContact()}>{id ? "Update" : "Create"}</Button>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Home