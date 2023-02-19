import "./App.css";
import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import {
  Navbar,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from "./components";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import {
  YELLOW,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  COMMENT,
} from "./helpers/colors";
import { contactContext } from "./context/contactContext";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  //const [contact, setContact] = useImmer({});
  // const [errors,setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (values) => {

    // event.preventDefault();

    try {

      setLoading((loading) => !loading);

      // await contactSchema.validate(contact,{abortEarly:false});

      const { status, data } = await createContact(values);

      /*   
         rerender after created contact : 
         1)Rerender -> forceRender,setRender
         2)setContacts(data)
      */

      if (status === 201) {

        toast.success("مخاطب با موفقیت ساخته شد", { icon: "🚀" });
        // const allContacts = [...contacts,data];

        // setContacts(allContacts);
        // setFilteredContacts(allContacts);

        setContacts((draft) => {
          draft.push(data);
        });
        
        setFilteredContacts((draft) => {
          draft.push(data);
        });

        // setContact({});
        // setErrors([]);
        setLoading((loading) => !loading);

        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
      // setErrors(error.inner);
      setLoading((loading) => !loading);
    }
  };

  // const onContactChange = (event) => {
  //   setContact({ ...contact, [event.target.name]: event.target.value });
  // }

  const confirmDelete = (contactId, contactFullName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمعنی که میخوای مخاطب {contactFullName} پاک کنی ؟
            </p>

            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمعن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    /* note:
    1)forcerender ->setforcerender
    2)server request
    3)delete local state
    4)delete state before request server
    */

    //copy contacts
    const contactsBackup = [...contacts];

    try {
      setLoading(true);

      // const updatedContacts = allContacts.filter(contact=>contact.id !== contactId);
      // setContacts(updatedContacts);
      // setFilteredContacts(updatedContacts);

      setContacts((draft) =>
        draft.filter((contact) => contact.id !== contactId)
      );
      setFilteredContacts((draft) =>
        draft.filter((contact) => contact.id !== contactId)
      );

      //send delete request to server
      const { status } = await deleteContact(contactId);

      setLoading(false);

      toast.error("مخاطب با موفقیت حذف شد", { icon: "💣" });

      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
      setLoading(false);
    }
  };

  const searchContact = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 1000);

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        // contact,
        // setContact,
        contacts,
        setContacts,
        filteredContacts,
        setFilteredContacts,
        groups,
        createContact: createContactForm,
        // onContactChange,
        deleteContact: confirmDelete,
        searchContact,
        // errors
      }}
    >
      <div className="App">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add-contact" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
};

export default App;
