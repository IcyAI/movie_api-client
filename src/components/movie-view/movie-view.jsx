
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export const MovieView = ({ movies, removeFav, addFav }) => {

    const { movieTitle } = useParams();

    const movie = movies.find((m) => m.title === movieTitle);

    const user = JSON.parse(localStorage.getItem('user'));

    //movie view
    return (

        <Row className="my-5 justify-content-md-center">

            <Col md={5}>

                <Col>
                    <img src={movie.image} />
                </Col>

                <Col>
                    <span class="spanOne"> Title:</span>
                    <span>{movie.title}</span>
                </Col>

                <Col>
                    <span class="spanOne">Description:</span>
                    <span>{movie.description}</span>
                </Col>

                <Col className="justify-content-center d-flex">
                    <span class="spanOne" >Genre</span>
                </Col>

                <Col>
                    <span class="spanOne" >Name: </span>
                    <span>{movie.genreName}</span>
                </Col>

                <Col>
                    <span class="spanOne" >Description: </span>
                    <span>{movie.genreDescription}</span>
                </Col>

                <Col className="justify-content-center d-flex">
                    <span class="spanOne" >Director</span>
                </Col>

                <Col>
                    <span class="spanOne" >Name: </span>
                    <span>{movie.directorName}</span>
                </Col>

                <Col>
                    <span class="spanOne"> Bio: </span>
                    <span>{movie.directorBio}</span>
                </Col>

                <Col>
                    <span class="spanOne" >Birth: </span>
                    <span>{movie.directorBirth}</span>
                </Col>

                <Col>
                    <span class="spanOne" >Death: </span>
                    <span>{movie.directorDeath}</span>
                </Col>

                <Col className="justify-content-end d-flex">
                    {user.FavoriteMovies.includes(movie.id) ? (
                        <Button on onClick={() => removeFav(movie.id)}>Remove from Favorite</Button>
                    ) : (
                        <Button onClick={() => addFav(movie.id)}>Add to Favorite</Button>
                    )}
                </Col>

                <Link to="/">
                    <Button variant="primary">Back</Button>
                </Link>
            </Col>
        </Row>


    );
};