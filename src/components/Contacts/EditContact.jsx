import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { ORANGE, COMMENT, PURPLE } from "../../helpers/colors";
import { getContact, updateContact } from "../../services/contactService";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { toast } from "react-toastify";

const EditContact = () => {

  const { contactId } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  const {
    loading,
    setLoading,
    groups,
    setFilteredContacts,
    setContacts,
  } = useContext(contactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const onContactChange = (event) => {
  //   setContact({ ...contact, [event.target.name]: event.target.value });
  // };

  const submitForm = async (values) => {
    // event.preventDefault();

    try {

      setLoading(true);
      const { data, status } = await updateContact(contactId, values);

      if (status === 200) {

        toast.success("مخاطب با موفقیت ویرایش شد", { icon: "🚀" });

        setLoading(false);


        /*note:
           1)forcerender->setforcerender(true)
           2)send request server
           3)update local state
         */

        // const allContacts = [...contacts];
        // const contactIndex = allContacts.findIndex(
        //   (c) => c.id === parseInt(contactId)
        // );
        // allContacts[contactIndex] = { ...data };
        // setContacts(allContacts);
        // setFilteredContacts(allContacts);

        setContacts((draft)=>{
          const contactIndex = draft.findIndex((c)=>c.id === parseInt(contactId));
          draft[contactIndex] = {...data}
        });

        setFilteredContacts((draft)=>{
          const contactIndex = draft.findIndex((C)=>C.id === parseInt(contactId));
          draft[contactIndex] = {...data};
        })

        navigate("/contacts");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={submitForm}
                  >
                      <Form>
                        <div className="mb-2">
                          <Field
                            name="fullname"
                            type="text"
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage name="fullname" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="profile"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />
                           <ErrorMessage name="profile" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="phone_number"
                            type="number"
                            className="form-control"
                            placeholder="شماره موبایل"
                          />
                         <ErrorMessage name="phone_number" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                          />
                           <ErrorMessage name="email" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="job"
                            type="text"
                            className="form-control"
                            placeholder="شغل"
                          />
                           <ErrorMessage name="job" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="group"
                            as='select'
                            className="form-control"
                          >
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage name="group" render={msg=>(<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ویرایش مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn mx-2"
                            style={{ backgroundColor: COMMENT }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    alt="img"
                    src={contact.profile}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                alt="img"
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
