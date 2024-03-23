
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
    const [username, setUsername] = useState(user.Username);
   //  const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);


    const navigate = useNavigate();


    const favoriteMovieList = movies.filter(m => user.FavoriteMovies.includes(m.id));

    const token = localStorage.getItem('token');

    //update user
    const handleUpdate = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
            Username: username,
          //  Password: user.Password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movies-flix50-8c220c6131d7.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            console.log(response)
            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Update was successful");
            } else {
                alert("Update failed")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    // Delete User
    const handleDelete = () => {
        fetch(`https://movies-flix50-8c220c6131d7.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("User has been deleted")
                localStorage.clear();
                navigate('/'); // go back to home page
            } else {
                alert("Something went wrong.")
            }
        })
    }

    //update user form/List of Favorite movies
    return (
        <Container className="my-5">
            <Row>
                <Col md={5}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={username}
                                required
                                minLength="3"
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={password}
                                required
                                minLength="4"
                            />
                        </Form.Group> */}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder= {user.Email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                placeholder={user.Birthday}
                            />
                        </Form.Group>

                        <Button type="submit" onClick={handleUpdate} className="mt-3">Update</Button>
                        <Button onClick={handleDelete} className="mt-3 bg-danger border-danger text-white justify-content-center">Delete User</Button>
                    </Form>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <h2 className="justify-content-center d-flex mt-5">Favorite Movies</h2>
                <Row className="justify-content-center">
                    {
                        favoriteMovieList?.length !== 0 ?
                            favoriteMovieList?.map((movie) => (
                                <Col sm={7} md={5} lg={3} xl={2} key={movie.id}>
                                    <MovieCard
                                        movie={movie}
                                        removeFav={removeFav}
                                        addFav={addFav}
                                        isFavorite={user.FavoriteMovies.includes(movie.id)}
                                    />
                                </Col>
                            ))
                            : <Col>
                                <p className="justify-content-center d-flex">There are no favorites Movies</p>
                            </Col>
                    }
                </Row>
            </Row>
        </Container>
    );
};