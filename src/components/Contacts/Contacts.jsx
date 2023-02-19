import { Fragment } from "react";
import { useContext } from "react";

import { PINK, CURRENTLINE, ORANGE } from "../../helpers/colors";
import {Spinner,Contact} from '../../components';
import { Link } from "react-router-dom";
import { contactContext } from "../../context/contactContext";

const Contacts = () => {

    const {filteredContacts,loading,deleteContact} = useContext((contactContext));

    return (

        <Fragment>
            <section className="container">
                <div className="row">
                    <div className="col">
                        <h3 className="float-end">
                            <Link to={'/contacts/add-contact'} className="btn mx-2 mt-3" style={{ backgroundColor: PINK }}>
                                ساخت مخاطب جدید
                                <i className="fa fa-plus-circle mx-2" />
                            </Link>
                        </h3>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> :

                <section className="container">
                    <div className="row">

                        {filteredContacts.length > 0 ? filteredContacts.map((contact) => (

                            <Contact key={contact.id} contact={contact} deleteContact={()=>deleteContact(contact.id,contact.fullname)} />

                        )) :

                            (
                                <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
                                    <p className="h3" style={{ color: ORANGE }}>
                                        مخاطب یافت نشد ...
                                    </p>

                                    <img src={require('../../assets/no-found.gif')} alt="پیدا نشد" className="w-25" />
                                </div>
                            )

                        }

                    </div>
                </section>
            }


        </Fragment>
    )
}

export default Contacts;