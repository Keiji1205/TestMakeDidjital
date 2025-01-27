import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UsersCard from "./UsersCard.tsx";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from 'react-bootstrap/Form';
import search_icon from "../img/search_icon.png";
import { useState} from "react";
import ButtonFilter from "./ButtonFilter.tsx";
import classes from "../Style/UsersList.module.css";
import deleate from "../img/deleate_icon.png";
import {
    useGetUsersQuery,
    useGetDeletedUserQuery,
    usePushDeletedUserMutation,
    useDeleteUserMutation,
    useConfirmUserMutation,
    useConfirmDeletedUserMutation,
    useBanUserMutation,
    useBanDeletedUserMutation,
} from "../../redux/usersApi.js";


interface User {
    id: number;
    name: string;
    city: string;
    isG: boolean;
    phone: string;
    t?: number;
    isVip?: boolean;
    blocked: boolean;
    confirmed: boolean;
}

interface ActiveFiltered {
    vip: boolean;
    blocked: boolean;
    citeName: boolean;
    deleted: boolean;
    confirmed: boolean;
}

interface ButtonFilterActive {
    blocked: boolean;
    deleted: boolean;
    confirmed: boolean;
}

const UsersList = () => {
    const {data:deletedUsers, refetch:deleteUserRefetch} = useGetDeletedUserQuery();
    const {data:users, refetch:userRefetch} = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [pushDeletedUser] = usePushDeletedUserMutation();
    const[confirmUser] = useConfirmUserMutation();
    const[confirmDeletedUser] = useConfirmDeletedUserMutation();
    const[banUser] = useBanUserMutation();
    const[banDeletedUser] = useBanDeletedUserMutation();
    const [inputValue, setInputValue] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [statusFilters, setStatusFilters] = useState<ActiveFiltered>({
        vip: false,
        blocked: false,
        citeName: false,
        deleted: false,
        confirmed: false,
    });
    const [buttonFilterActive, setButtonFilterActive] = useState<ButtonFilterActive>({
        blocked: false,
        deleted: false,
        confirmed: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const resetFilters = () => {
        setStatusFilters({
            vip: false,
            blocked: false,
            citeName: false,
            deleted: false,
            confirmed: false,
        })
        setButtonFilterActive({
            blocked: false,
            deleted: false,
            confirmed: false,
        });
        setSelectedCity('');
    }

    const handleBlockedChange = () => {

        setButtonFilterActive(prevState => ({
            ...prevState,
            blocked: !prevState.blocked
        }));

        setStatusFilters(prevState => ({
            ...prevState,
            blocked : !prevState.blocked
        }));
    }

    const handleDeletedChange = () => {
        setButtonFilterActive(prevState => ({
            ...prevState,
            deleted: !prevState.deleted
        }));
        setStatusFilters(prevState => ({
            ...prevState,
            deleted : !prevState.deleted
        }));
    }

    const handleConfirmedChange = () => {
        setButtonFilterActive(prevState => ({
            ...prevState,
            confirmed: !prevState.confirmed
        }));
        setStatusFilters(prevState => ({
            ...prevState,
            confirmed : !prevState.confirmed
        }));
    }


    const filteredUsers = (statusFilters.deleted ? deletedUsers : Array.isArray(users) ? [...users, ...deletedUsers] : []).filter((user: User) => {
        if (!user) return false;

        const matchesName = user.name.toLowerCase().includes(inputValue.toLowerCase());
        const matchesCity = selectedCity ? user.city === selectedCity : true;

        return (
            matchesName &&
            matchesCity &&
            (statusFilters.vip ? user.isVip : true) &&
            (statusFilters.blocked ? user.blocked : true) &&
            (statusFilters.citeName ? user.city : true) &&
            (statusFilters.confirmed ? user.confirmed : true)
        );
    });


    const handleDelete = async (userId: number) => {
        //находим пользователя по id и отправляем его на удаление
        const userToDelete = users.find((user: User) => user.id === userId);

        if (userToDelete) {
            try {
                // Отправляем пользователя на сервер (например, в "удаленные")
                await pushDeletedUser(userToDelete).unwrap();
                // Затем удаляем пользователя из основного списка
                await deleteUser(userId).unwrap(); // Убедитесь, что deleteUser вызывается корректно
                deleteUserRefetch();
                userRefetch();
            } catch (error) {
                console.error('Ошибка при блокировке или удалении пользователя:', error);
                // Если необходимо, можно вернуть пользователя обратно в состояние
            }
        } else {
            console.log('Пользователь не найден');
        }
    };

    const handleBan =  async (userId: number) => {

        if (statusFilters.deleted){
            const userToBan = deletedUsers.find((user: User) => user.id === userId);

            if (userToBan) {
                try {
                    await banDeletedUser(userToBan).unwrap();
                    deleteUserRefetch();
                    userRefetch();
                } catch (error) {
                    console.error('Ошибка при блокировке пользователя:', error);
                    // Если необходимо, можно вернуть пользователя обратно в состояние
                }
            } else {
                console.log('Пользователь не найден');
            }
        }else{
            const userToBan = users.find((user: User) => user.id === userId);

            if (userToBan) {
                try {
                    await banUser(userToBan).unwrap();
                    deleteUserRefetch();
                    userRefetch();
                } catch (error) {
                    console.error('Ошибка при блокировке пользователя:', error);
                    // Если необходимо, можно вернуть пользователя обратно в состояние
                }
            } else {
                console.log('Пользователь не найден');
            }
        }
    };

    const handleHide = (userId: number): User[] => {
        // Проверяем, нужно ли использовать deletedUsers или users
        const userList = buttonFilterActive.deleted ? deletedUsers : users;

        return userList.map((user: User) => {
            if (user.id === userId) {
                console.log(`Пользователь ${user.name} был скрыт, id пользователя: ${user.id}`);
            }
            return user; // Возвращаем пользователя без изменений
        });
    };

    const handleConfirm =  async (userId: number) => {

        if (statusFilters.deleted){
            const userToConfirm = deletedUsers.find((user: User) => user.id === userId);

            if (userToConfirm) {
                try {
                    await confirmDeletedUser(userToConfirm).unwrap();
                    deleteUserRefetch();
                    userRefetch();
                } catch (error) {
                    console.error('Ошибка при подтверждении пользователя:', error);
                    // Если необходимо, можно вернуть пользователя обратно в состояние
                }
            } else {
                console.log('Пользователь не найден');
            }
        }else{
            const userToConfirm = users.find((user: User) => user.id === userId);

            if (userToConfirm) {
                try {
                    await confirmUser(userToConfirm).unwrap();
                    deleteUserRefetch();
                    userRefetch();
                } catch (error) {
                    console.error('Ошибка при подтверждении пользователя:', error);
                    // Если необходимо, можно вернуть пользователя обратно в состояние
                }
            } else {
                console.log('Пользователь не найден');
            }
        }
    };

    const renderCityDropdownItems = (userArray: User[]) => {
        if (!userArray || userArray.length === 0) {
            return null; // Или любое другое значение по умолчанию
        }

        return Array.from(new Set(userArray.map(user => user.city))) // Создаем уникальный список городов
            .filter(city => city.length > 0) // Фильтруем пустые строки
            .map((city, index) => ( // Отображаем уникальные города
                <Dropdown.Item
                    key={index}
                    eventKey={index.toString()}
                    onClick={() => setSelectedCity(city)}
                >
                    {city}
                </Dropdown.Item>
            ));
    };


    const dropdownItems = buttonFilterActive.deleted
        ? renderCityDropdownItems(deletedUsers)
        : renderCityDropdownItems(users);

    const buttonAll:boolean = (
        !statusFilters.vip &&
        !statusFilters.blocked &&
        !statusFilters.citeName &&
        !statusFilters.confirmed &&
        !buttonFilterActive.deleted &&
        inputValue === "" &&
        selectedCity === ""
    );

    return (
        <>
            <Col>
                <Container fluid className={classes.contNamePage}>
                    <span className={classes.namePage}>Пользователи</span>
                </Container>
                <Container fluid style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {inputValue.length === 0 && (
                        <label htmlFor="search-input" style={{ position: "absolute", left: "80px", transition: "0.2s ease", color: "#999" }}>
                            Поиск
                        </label>
                    )}
                    <img src={search_icon} alt="Search" style={{ width: "30px", position: "absolute", left: "30px", cursor:'pointer' }} />
                    <Form.Control
                        id="search-input"
                        size="lg"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{ paddingLeft:"60px" }}
                    />
                </Container>
                <Container fluid style={{display:"flex", margin:"20px 0px", gap:"25px", alignItems:"center", justifyContent:"center", flexWrap:"wrap" }}>
                    <ButtonFilter
                    onClick={() =>resetFilters()}
                    isActive={buttonAll}>
                        Все
                    </ButtonFilter>
                    <ButtonFilter
                        isActive={buttonFilterActive.blocked}
                        onClick={() =>(handleBlockedChange())}>
                        Заблокированные
                    </ButtonFilter>
                    <ButtonFilter
                        onClick={() => handleDeletedChange()}
                        isActive={buttonFilterActive.deleted}>
                        Удалённые
                    </ButtonFilter>
                    <ButtonFilter
                        onClick={() => handleConfirmedChange()}
                        isActive={buttonFilterActive.confirmed}>
                        Подтвержденные
                    </ButtonFilter>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle style={{
                            color:"black",
                            backgroundColor:"#f5f5f5",
                            border:"none",
                            boxShadow:"0 0 10px 3px rgba(0,0,0,0.2)"
                        }}>Выбрать город</Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            {dropdownItems}
                        </Dropdown.Menu>
                    </Dropdown>
                    {
                        selectedCity && (
                            <span style={{ marginLeft: "10px", fontSize: "16px", color: "#999" }}>
                                Выбран город: {selectedCity}
                                <img style={{cursor:"pointer",width:"15px",marginLeft:"10px"}} src={deleate} alt="deleate_icon"
                                onClick={()=>setSelectedCity('')}/>
                            </span>
                        )
                    }
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user: User) => ( // Explicitly typing user as User
                                    <UsersCard
                                        key={user.id}
                                        name={user.name}
                                        city={user.city}
                                        isGeolocationAllowed={user.isG}
                                        phone={user.phone}
                                        t={user.t}
                                        isVip={user.isVip}
                                        handleConfirm={() => handleConfirm(user.id)}
                                        handleBan={() => handleBan(user.id)}
                                        handleHide={() => handleHide(user.id)}
                                        handleDelete={() => handleDelete(user.id)}
                                    />
                                ))
                            ) : (
                                <h1 className={classes.noUser}>Пользователь не найден</h1>
                            )}
                        </Col>
                    </Row>
                </Container>
            </Col>
        </>
    );
}

export default UsersList;
