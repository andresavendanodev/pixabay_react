import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  scrollPrincipio = () => {
    const elemento = document.querySelector(".jumbotron")
    elemento.scrollIntoView('smooth', 'end');
  }

  paginaAnterior = () => {
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Si la página es 1 ya no ir hacia atras
    if (pagina === 1) return null;

    //Sumar 1 a la pagina actual
    pagina -= 1;
    
    //Agregar el cambio al state
    this.setState({
        pagina
      }, () => {
        this.consultarApi();
        this.scrollPrincipio();
      });


    //console.log(pagina);
  }
  paginaSiguiente = () => {
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Sumar 1 a la pagina actual
    pagina += 1;

    //Agregar el cambio al state
    this.setState({
        pagina
      }, () => {
        this.consultarApi();
        this.scrollPrincipio();
      });

    //console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${this.state.termino}&per_page=30&page=${pagina}`;
    // URL de documentacion API Picabay: https://pixabay.com/api/docs/
    const resultado = '';

    console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes:resultado.hits }))
  }
  
  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render (){
    return (
      <div className="App container">
        <div className='jumbotron'>
          <img className='w-25' src='/shiba.png'/>
          <h1 className='text-center lead'>Buscador de Imagenes</h1>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div> 
        <Resultado
          imagenes={this.state.imagenes}
          paginaAnterior={this.paginaAnterior}
          paginaSiguiente={this.paginaSiguiente}
        />
      </div>
    );
  }
}

export default App;
