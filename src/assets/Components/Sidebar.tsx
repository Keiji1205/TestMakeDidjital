import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavBarLink from "./NavBarLink.tsx";
import { NavbarBrand } from "react-bootstrap";
import React from "react";
import eye from '../img/eye.png';
import exitDoor from '../img/exitDoor.png';
import burger from '../img/burger_icon.png';
import arrow from '../img/arrow_icon.png';
import classes from '../Style/SideBar.module.css'; // Import the CSS file

interface SideBarProps {
    clickLink: (childLink: string) => void;
    isActive?: string;
    isHide: boolean;
    clickSideBar: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({ clickLink, isActive, isHide, clickSideBar }: SideBarProps) => {


    return (
        <>
        <img src={burger} alt="burger" className={`m-3 ${classes.imgButton}`} style={{position: "absolute",width: '60px', top:"0"}} onClick={() => clickSideBar()}/>
            <Col className={`m-0 col-md-auto p-0 ${classes.sidebarContainer} ${isHide ? classes.hide : classes.show}`}>
                <Navbar className={classes.sidebarNavbar}>
                    <img src={arrow} alt="arrow" className={`m-3 ${classes.imgButton}`} style={{position: "absolute", width: '40px', right: "0"}} onClick={()=>clickSideBar()}/>
                    <Navbar.Brand
                        className={classes.sidebarBrand}
                        as={NavbarBrand}
                        to="/"
                        onClick={() => clickLink("/")}>
                        <h1 className={classes.brandTitle}>lalau</h1>
                    </Navbar.Brand>
                    <Nav className={classes.navList}>
                        <NavBarLink value="/services-and-money" isActive={isActive} onClick={clickLink}
                                    isDisabled={true}>Услуги и деньги</NavBarLink>
                        <NavBarLink value="/photo-moderation" isActive={isActive} onClick={clickLink} isDisabled={true}>Модерация
                            фото</NavBarLink>
                        <NavBarLink value="/user-statistics" isActive={isActive} onClick={clickLink} isDisabled={true}>Статистика
                            пользователей</NavBarLink>
                        <NavBarLink value="/vip-confirmation" isActive={isActive} onClick={clickLink} isDisabled={true}>Подтверждение
                            ВИП</NavBarLink>
                        <NavBarLink value="/verification" isActive={isActive} onClick={clickLink}
                                    isDisabled={true}>Верификация</NavBarLink>
                        <NavBarLink value="/user-requests" isActive={isActive} onClick={clickLink} isDisabled={true}>Запросы
                            пользователей</NavBarLink>
                        <NavBarLink value="/users" isActive={isActive} onClick={clickLink}>Пользователи</NavBarLink>
                        <NavBarLink value="/premium-services" isActive={isActive} onClick={clickLink} isDisabled={true}>Премиум
                            услуги</NavBarLink>
                        <NavBarLink value="/create-post" isActive={isActive} onClick={clickLink} isDisabled={true}>Создание
                            публикации</NavBarLink>
                        <NavBarLink value="/edit-post" isActive={isActive} onClick={clickLink} isDisabled={true}>Редактирование
                            публикации</NavBarLink>
                        <NavBarLink value="/post-pages" isActive={isActive} onClick={clickLink} isDisabled={true}>Страницы
                            публикаций</NavBarLink>
                        <NavBarLink value="/bulk-mailing" isActive={isActive} onClick={clickLink} isDisabled={true}>Массовая
                            рассылка</NavBarLink>
                        <NavBarLink value="/ready-responses" isActive={isActive} onClick={clickLink} isDisabled={true}>Готовые
                            ответы</NavBarLink>
                        <NavBarLink value="/user-properties" isActive={isActive} onClick={clickLink} isDisabled={true}>Свойства
                            пользователей</NavBarLink>
                        <NavBarLink value="/city-management" isActive={isActive} onClick={clickLink} isDisabled={true}>Управление
                            городами</NavBarLink>
                        <Nav as="ul" className={classes.navItem}>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="link-1">Супер админ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="link-2">
                                    <img src={eye} alt="eye" style={{width: "20px"}}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="link-3">
                                    <img src={exitDoor} alt="exitDoor" style={{width: "20px"}}/>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Nav>
                </Navbar>
            </Col>
        </>
    );
};

export default Sidebar;
