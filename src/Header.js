import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function Header() {
    const navigation=useNavigate();
    function logout(){
        localStorage.clear();
        navigation('/register');
        
    }
    const user=JSON.parse(localStorage.getItem('user-info'));
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar id="basic-navbar-nav nav-bar-wrapper">
                        <Nav className="me-auto">
                            {
                                localStorage.getItem('user-info') ?
                                    <>
                                        <Link to="/">Products List</Link>
                                        <Link to="/add">Add-Product</Link>
                                        <Link to="/searchproduct">Search-Product</Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/login">Login</Link>
                                        <Link to="/register">Register</Link>
                                    </>
                            }
                        </Nav>
                        {
                         localStorage.getItem('user-info')? 
                         <>

                        <Nav>
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                    {user && user.name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                                    <Dropdown.Item >Profile</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        </>
                        :null
                        }
                    </Navbar>

                </Container>
            </Navbar>
        </div>
    );

}
export default Header;