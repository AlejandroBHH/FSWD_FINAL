import Navbar from "../../utils/Navigation/Navbar";
import { useState, useEffect, useRef } from "react";
import classes from "../Search/HomeSearch.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import HeaderSection from "../../components/Header/HeaderSection";
import Table from "../../components/Table/Table";
import SubmitButton from "../../UI/Button/SubmitButton";
//modal para el stayloggedin

import IntermediateRows from "../../components/IntermediateRows/IntermediateRows";
import Carrousel from "../../components/Carrousel/Carrousel";
import Footer from "../../utils/Footer/Footer";

function Index() {
  const [components, setComponents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams(); // Obtener el valor de id de la URL
  const [currentPage, setCurrentPage] = useState(id ? parseInt(id) : 1);

  const itemsPerPage = 15; // Número de elementos por página
  const navigate = useNavigate();
  //ordenar la tabla
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  //manejar el filter
  const [enteredValue, setEnteredValue] = useState(""); // Nuevo estado

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false); // Cambiar a `true` cuando el usuario inicie sesión
  const tableRef = useRef(null); // Crear una referencia para la tabla
  //Fanfiction selección
  const [modelToQuery, setModelToQuery] = useState("Book");

  useEffect(() => {
    // Aquí deberías obtener el token de autenticación, ya sea de una cookie,
    // del almacenamiento local (localStorage) o de donde corresponda.
    // Por ejemplo, si estás usando un token almacenado en localStorage:
    const storedToken = localStorage.getItem("accessToken");

    // Realizar la llamada a la API solo si tienes un token válido
    if (storedToken) {
      let apiUrl = `http://localhost:8000/library/?page=${currentPage}&perPage=${itemsPerPage}&sortField=${sortBy}&sortOrder=${sortOrder}&modelToQuery=${modelToQuery}`;

      // Agregar el filtro solo si enteredValue tiene un valor
      if (enteredValue) {
        const encodedValue = encodeURIComponent(enteredValue);
        apiUrl += `&filterValue=${encodedValue}`;
      }

      fetch(apiUrl, {
        headers: {
          "auth-token": storedToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          setComponents(data.data);
          setTotalPages(data.totalPages);
          setUserIsLoggedIn(true);
        })
        .catch((error) => {
          //para que aparezca el modal de stayloggedin
          // Token inválido, mostrar alerta y redirigir a la página de inicio de sesión
          //alert("Tu sesión ha caducado. Por favor, inicia sesión nuevamente.");
          //navigate(`/login`);
        });
    } else {
      setUserIsLoggedIn(false);
      navigate(`/login`); // Redirigir a la página de inicio de sesión si no hay un token
    }
  }, [currentPage, sortBy, sortOrder, enteredValue, modelToQuery]);
  //console.log(components);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (newPage === 1) {
        navigate(`/index/Page/${newPage}.html`);
        setCurrentPage(newPage);
        //para subir la pantalla al pasar de páginas
        window.scrollTo({ top: -50, behavior: "smooth" });
      } else {
        navigate(`/index/Page/${newPage}.html`);
        setCurrentPage(newPage); // Mover setCurrentPage después de la navegación
        window.scrollTo({ top: -50, behavior: "smooth" });
      }
    } else if (newPage < 1) {
      // Si newPage es menor que 1, ajustar a 1 para evitar valores negativos
      setCurrentPage(1);
      navigate(`/index`);
    }
  };

  const handleSortUpdate = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      //console.log(sortOrder);
    } else {
      setSortBy(field);
      setSortOrder("asc"); // Orden ascendente por defecto cuando cambias la columna
    }
  };

  const handleEnteredValueChange = (value) => {
    setEnteredValue(value); // Actualizar el estado de enteredValue
    //console.log(enteredValue);
  };

  /*const handleRefreshToken = () => {
    // Aquí debes enviar el refreshToken al servidor para renovar el token
    // Luego, cerrar el modal.
    setVisible(false);
  };*/

  const handleImageClick = () => {
    // Hacer focus en la tabla cuando se haga click en la imagen
    if (tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  return (
    <div>
      {/* creamos el portal y lo asignamos */}
      {/*   {ReactDOM.createPortal(
        <StayLogged visible={visible} onStayLoggedIn={handleRefreshToken} />,
        document.querySelector("#modal")
      )}*/}
      <Navbar></Navbar>
      <HeaderSection></HeaderSection>
      <div className={classes.line}></div>
      <img
        className={classes.backimages}
        src="/images/1768.png"
        alt="Mi Imagen"
      />
      {/*imagenes*/}
      <IntermediateRows></IntermediateRows>
      <div className={classes.landContainer}>
        <span>
          “Fanfiction is a place where dreams and reality collide. It’s pure
          magic!”
        </span>
      </div>

      <div>
        {" "}
        {userIsLoggedIn && (
          <>
            <Carrousel
              imagenClick={handleImageClick}
              setModel={setModelToQuery}
            ></Carrousel>

            <div className={classes.lineTable} ref={tableRef}></div>
            <SubmitButton
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
              onImageClick={handleImageClick}
            ></SubmitButton>

            <div className={classes.Container}>
              <Table
                data={components}
                handleSort={handleSortUpdate}
                sort={sortOrder}
                sortBy={sortBy}
                onEnteredValueChange={handleEnteredValueChange}
              ></Table>
              <SubmitButton
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
                onImageClick={handleImageClick}
              ></SubmitButton>
            </div>
          </>
        )}
        <div className={classes.landContainerLog}>
          <div className={classes.landContainerLogWrapper}>
            {" "}
            <span>
              Ready for an unforgettable adventure? Join the Fanfiction Hub
              community today and share your tales!
            </span>
            <div className={classes.LastButton}>
              {" "}
              <button onClick={(e) => navigate("/register")}>Sign Up</button>
              <button style={{ backgroundColor: "orange" }}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Index;
