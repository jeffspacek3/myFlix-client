import PropTypes from "prop-types";

export const MovieView = ({ movie }) => {
    return (
      <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link  to={"/movies/${encodeURIComponent(movie.id)}"}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
    );
  };
  
MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
  }).isRequired,
};