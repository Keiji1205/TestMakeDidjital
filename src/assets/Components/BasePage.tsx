import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import styles from '../Style/BasePage.module.css';


const BasePage = () => {
    return (
        <>
            <Col style={{ backgroundColor:"#f5f5f5" }}>
                <Container fluid className={styles.container}>
                    <h1 style={{ color: "#999" }}>Главная</h1>
                </Container>
            </Col>
        </>
    );
}

export default BasePage;
