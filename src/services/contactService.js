import axios from "axios";

const SERVER_URL = "http://localhost:9000";

//@desc get all contacts
//@route GET http://localhost:9000/contacts
export const getAllContacts = ()=>{

    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

//@desc get contact with contactId
//@route GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId)=>{

    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

//@desc get all groups
//@route GET http://localhost:9000/groups
export const getAllGroups = ()=>{

    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

//@desc get group with groupId
//@route GET http://localhost:9000/groups/:groupId
export const getGroup = (groupId)=>{

    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

//@desc create new contact
//@route POST http://localhost:9000/contacts
export const createContact = (contact)=>{

    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

//@desc update contact
//@route PUT http://localhost:9000/contacts/:contactId
export const updateContact = (contactId,contact)=>{

    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
}

//@desc delete contact
//@route DELETE http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId)=>{

    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}