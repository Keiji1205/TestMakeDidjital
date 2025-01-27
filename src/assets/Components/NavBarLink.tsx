import Nav from "react-bootstrap/Nav";
import React from 'react';
import {NavLink} from "react-bootstrap";

interface NavBarLinkProps {
    children: string;
    isActive?: string;
    onClick?: (href: string) => void;
    isMessagePresent?: boolean;
    value:string;
    isDisabled?:boolean;
}
const NavBarLink: React.FC<NavBarLinkProps> = ({children, isActive, onClick,value,isDisabled})=>{
    return(
        <>
            <Nav.Link
                className="mx-3"
                as={NavLink}
                to={value}
                style={(isDisabled ? {color: "grey"} : isActive === value ? {color: "#FF69B4"} : {color:"black"})}
                onClick={() => onClick?.(value)}
                disabled={isDisabled}>
                {children}
            </Nav.Link>
            <span style={{width: "100%", height: "2px", backgroundColor: "rgba(0, 0, 0, 0.1)"}}></span>
        </>
    )
}

export default NavBarLink;