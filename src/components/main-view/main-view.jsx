import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
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

  return (
    <>
      <BrowserRouter>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:moviesId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/movies/:moviesId" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movie={movie} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                {user ? <ProfileView user={user} 
                /> : <Navigate to="/" />}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </>
  );

};
