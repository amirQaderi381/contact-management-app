import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { PURPLE } from "../../helpers/colors";

const SearchContact = () => {

    const {searchContact} = useContext(contactContext);

    return (

        <section className="input-group mx-2 w-75" dir="ltr">

            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: PURPLE }}>
                <i className="fas fa-search" />
            </span>

            <input dir="rtl" type="text" className="form-control" placeholder="جستجوی مخاطب" aria-label="Search"
            aria-describedby="basic-addon1" onChange={(event)=>{searchContact(event.target.value)}} />

        </section>
    )
}
export default SearchContact;