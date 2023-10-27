import Navbar from "../../utils/Navigation/Navbar";
import { useState, useEffect, useRef } from "react";
import classes from "../Search/HomeSearch.module.css";
import { useNavigate, useParams } from "react-router-dom";

import HeaderSection from "../../components/Header/HeaderSection";
import Table from "../../components/Table/Table";
import SubmitButton from "../../UI/Button/SubmitButton";
//modal para el stayloggedin

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
  //para hacer visible el modal de stayloggedin
  const [visible, setVisible] = useState(false);
  const tableRef = useRef(null); // Crear una referencia para la tabla
  //Fanfiction selección
  const [modelToQuery, setModelToQuery] = useState("Book");

  useEffect(() => {
    // Aquí deberías obtener el token de autenticación, ya sea de una cookie,
    // del almacenamiento local (localStorage) o de donde corresponda.
    // Por ejemplo, si estás usando un token almacenado en localStorage:
    const storedToken = localStorage.getItem("accessToken");
    const storedToken2 = localStorage.getItem("refreshToken");

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
          "refresh-token": storedToken2,
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
        })
        .catch((error) => {
          //para que aparezca el modal de stayloggedin
          setVisible(true);
          // Token inválido, mostrar alerta y redirigir a la página de inicio de sesión
          //alert("Tu sesión ha caducado. Por favor, inicia sesión nuevamente.");
          //navigate(`/login`);
        });
    } else {
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(`/index/Page/${newPage}.html`);
        setCurrentPage(newPage); // Mover setCurrentPage después de la navegación
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    tableRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
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
      {/*imagenes*/}
      <Carrousel
        imagenClick={handleImageClick}
        setModel={setModelToQuery}
      ></Carrousel>
      {/*fin imagenes*/}
      <div className={classes.lineTable} ref={tableRef}></div>
      <SubmitButton
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
        onImageClick={handleImageClick}
      ></SubmitButton>
      {/*empieza la tabla */}

      <div className={classes.Container}>
        <Table
          data={components}
          handleSort={handleSortUpdate}
          sort={sortOrder}
          sortBy={sortBy}
          //proviene del filter del taskinput qque le pasa a table y ahora a index para tener el get
          onEnteredValueChange={handleEnteredValueChange}
        ></Table>
        <SubmitButton
          current={currentPage}
          total={totalPages}
          onPageChange={handlePageChange}
          onImageClick={handleImageClick}
        ></SubmitButton>
        {/*pasamos por props el counter del numero de historias para el fetch de FavHistory */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Index;
