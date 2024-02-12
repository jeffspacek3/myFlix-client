import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Form, Container, Row, Col} from "react-bootstrap";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cinemark-movie-flix-4533a3ab9445.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            _id: movie.key,
            Title: movie.Title,
            image: "https://cinemark-movie-flix-4533a3ab9445.herokuapp.com/",
            author: doc.author_name?.[0],
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  // allows SignupView code to be displayed
  if (!user) {
    return (
      <>
        <Container style={{ border: "1px solid red" }}>
          <Row>
            <Col className="mb-5" key={movies.id} md={3}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
          </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <Container>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </Container>
    </div>
  );
};
