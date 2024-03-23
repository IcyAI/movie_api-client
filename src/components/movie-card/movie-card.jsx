import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    //movie card
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title> {movie.title} </Card.Title>
                <Card.Text className="mb-0"> {movie.directorName} </Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button className="mb-4" variant="link"> open</Button>
                </Link>

                <div className="justify-content-center d-flex">
                    {user.FavoriteMovies.includes(movie.id) ? (
                        <Button on onClick={() => removeFav(movie.id)}>Remove from Favorite</Button>
                    ) : (
                        <Button onClick={() => addFav(movie.id)}>Add to Favorite</Button>
                    )}
                </div>

            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired
};