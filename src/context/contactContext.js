import { createContext } from "react";

export const contactContext = createContext({

    loading:false,
    setLoading:()=>{},
    // contact:{},
    // setContact:()=>{},
    contacts:[],
    setContacts:()=>{},
    filteredContacts:[],
    setFilteredContacts:()=>{},
    groups:[],
    createContact:()=>{},
    onContactChange:()=>{},
    deleteContact:()=>{},
    updateContact:()=>{},
    searchContact:()=>{},
    // errors : [],

})