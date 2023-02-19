import { useLocation } from 'react-router-dom';
import SearchContact from './Contacts/SearchContact';
import { BACKGROUND, PURPLE } from '../helpers/colors';

const Navbar = () => {

    const location = useLocation();

    return (

        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{ backroundColor: BACKGROUND }}>

            <section className="container">

                <section className="row w-100">

                    <section className="col">
                        <section className='navbar-brand'>
                            <i className="fas fa-id-badge" style={{ color: PURPLE }} />{" "}
                            وب اپلیکیشن مدیریت {" "}
                            <span style={{ color: PURPLE }}>مخاطبین</span>
                        </section>
                    </section>

                    {location.pathname === '/contacts' ? (
                        <section className="col">
                            <SearchContact />
                        </section>
                    ) : null}


                </section>
            </section>

        </nav>
    )
}

export default Navbar;