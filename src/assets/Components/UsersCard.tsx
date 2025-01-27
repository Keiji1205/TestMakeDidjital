import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React from 'react';
import Card from 'react-bootstrap/Card';
import avatar from '../img/avatar_icon.png';
import confirm from '../img/confirm.png';
import ban from '../img/ban.png';
import hide from '../img/hide.png';
import styles from '../Style/UsersCard.module.css';

interface UsersProps {
    name:string;
    city:string;
    isGeolocationAllowed?:boolean;
    phone: string;
    t?:number;
    isVip?:boolean;
    handleConfirm:() => void;
    handleBan:() => void;
    handleHide:() => void;
    handleDelete:() => void;
}

const NavBarLink: React.FC<UsersProps> = ({name, city, isGeolocationAllowed, phone, t, isVip,handleConfirm,handleBan,handleHide,handleDelete}) => {
    return (
        <Card className={styles.card}>
            <span className={`${styles.cardStick} ${styles.top}`}></span>
            <Card.Body className={styles.cardBody1}>
                <Card.Body className={styles.cardBody2}>
                    <Card.Img variant="left" src={avatar} style={{width: "100%", height:"auto",objectFit:"contain",maxWidth:"60px"}} />
                    <section className={styles.userInfo}>
                    <Card.Title className="m-0" style={{display:"flex", alignItems:"center"}}>
                        {name}
                        {isVip && <div className={styles.vipBadge}>VIP</div>}
                    </Card.Title>
                    <Card.Text className="m-0" style={{fontSize: "0.7rem"}}>
                        {city}
                    </Card.Text>
                    {isGeolocationAllowed && (
                        <Card.Text className="m-0" style={{fontSize: "0.8rem"}}>
                            <Card.Link href="#">Геолокация</Card.Link>
                        </Card.Text>
                    )}
                    </section>
                </Card.Body>
                <Card.Body className={styles.buttonContainerPhone}>
                    <Card.Text className="m-0">{phone}</Card.Text>
                    <Card.Text className="m-0">{t} t.</Card.Text>
                </Card.Body>
                <Card.Body className={styles.buttonContainer}>
                    {['confirm', 'hide', 'ban'].map((action) => (
                        <div key={action} className={styles.actionButtons}>
                            <button style={{backgroundColor: "transparent", border: "none"}} onClick={() => action === 'confirm' ? handleConfirm() : action === 'hide' ? handleHide() : handleBan()}>
                                <img style={{width: "20px"}} src={action === 'confirm' ? confirm : action === 'hide' ? hide : ban} alt={action} />
                            </button>
                        </div>
                    ))}
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle className={styles.dropdownToggle}>Пользователи</Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item eventKey="1" onClick={()=>handleDelete()}>Удалить пользователя</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card.Body>
            <span className={`${styles.cardStick} ${styles.bottom}`}></span>
        </Card>
    );
}

export default NavBarLink;
