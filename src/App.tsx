import Sidebar from "./assets/Components/Sidebar.tsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UsersList from "./assets/Components/UsersList.tsx";
import { useState } from "react";
import BasePage from "./assets/Components/BasePage.tsx";

function App() {
    const [isActive, setIsActive] = useState<string>("");
    const [isHide, setIsHide] = useState<boolean>(false)

    const clickLink = (childLink: string) => {
        setIsActive(childLink);
        setIsHide(!isHide)
    };

    const renderPage = () => {
        switch (isActive) {
            case "/users":
                return <UsersList/>;
                case "/":
                    return <BasePage />;
            default:
                return <BasePage/>;
        }
    };

    return (
        <Container fluid className="m-0" style={{ minHeight: "100vh",backgroundColor: "rgb(231 231 231)" }}>
            <Row style={{position:"relative"}}>
                <Sidebar clickLink={clickLink} isActive={isActive} isHide={isHide} clickSideBar={()=>{setIsHide(!isHide)}} />
                {renderPage()}
            </Row>
        </Container>
    );
}

export default App;
