import { useContext } from "react";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { contactContext } from "../../context/contactContext";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";

const AddContact = () => {
  const { loading, groups, createContact } = useContext(contactContext);

  // const formik = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     profile: "",
  //     phone_number: "",
  //     email: "",
  //     job: "",
  //     group: "",
  //   },
  //   validationSchema: contactSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     createContact(values);
  //   },
  // });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              alt=""
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  {/* {errors?.map((error,index)=>(
                       <p key={index} className="alert alert-danger">{error.message}</p>
                    ))} */}

                  <Formik
                    initialValues={{
                      fullname: "",
                      profile: "",
                      phone_number: "",
                      email: "",
                      job: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      createContact(values);
                    }}
                  >
                    {/* {(formik) => ( */}
                      {/* <form onSubmit={formik.handleSubmit}> */}
                       <Form>
                        <div className="mb-2">
                          <Field
                            // id="fullname"
                            name="fullname"
                            type="text"
                            // name="fullname"
                            // value={formik.values.fullname}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // {...formik.getFieldProps('fullname')}
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          {/* {formik.touched.fullname && formik.errors.fullname ? (
                            <div className="text-danger">
                              {formik.errors.fullname}
                            </div>
                          ) : null} */}
                          <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="profile"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />
                          <ErrorMessage name="profile" render={msg => (<div className="text-danger">{msg}</div>)} />
                        </div>

                        <div className="mb-2">
                          <Field
                            name="phone_number"
                            type="number"
                            className="form-control"
                            placeholder="شماره موبایل"
                          />
                         <ErrorMessage name="phone_number" render={msg => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                          />
                          <ErrorMessage name="email" render={msg => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="job"
                            type="text"
                            className="form-control"
                            placeholder="شغل"
                          />
                          <ErrorMessage name="job" render={msg => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="group"
                            as="select"
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
                          <ErrorMessage name="groups" render={msg => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ساخت مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn mx-2"
                            style={{ backgroundColor: COMMENT }}
                          >
                            انصراف
                          </Link>
                        </div>
                      {/* </form> */}
                    {/* )} */}
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
