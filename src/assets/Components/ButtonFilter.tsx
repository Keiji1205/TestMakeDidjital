import React from "react";
import Button from "react-bootstrap/Button";

interface ButtonFilterProps {
    children: string;
    onClick?: () => void;
    isActive?: boolean;
}


const ButtonFilter: React.FC<ButtonFilterProps> = ({children, onClick ,isActive}) => {
    return (
        <>
            <Button style={isActive ?({
                color:"white",
                backgroundColor:"#FF69B4",
                border:"none",
                boxShadow:"0 0 10px 3px rgba(0,0,0,0.2)"
            }) : ({
                color:"black",
                backgroundColor:"#f5f5f5",
                border:"none",
                boxShadow:"0 0 10px 3px rgba(0,0,0,0.2)"})} onClick={onClick}
            >{children}</Button>
        </>
    )
}

export default ButtonFilter;