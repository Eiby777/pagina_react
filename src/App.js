import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './style.css';
import './util.css';




export default function App() {
  return (
    <div>
      <Cabezado />
      <Listado />
    </div>
  );
}
function EnviarDatos(NombreEnviado, ApellidoEnviado, TelefonoEnviado){
  const datos = {nombre:"", apellido:"", telefono:""};
	datos.nombre = NombreEnviado;
	datos.apellido = ApellidoEnviado;
	datos.telefono = TelefonoEnviado;
  console.log(datos.nombre);
	fetch("http://www.raydelto.org/agenda.php", {
  	method: 'POST', 
	mode: 'no-cors',
 	body: JSON.stringify(datos),
  	headers:{
		'Content-Type': 'application/json'
  	}
	}).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => console.log('Success:', response));

  setTimeout(CargarPágina,4000)
}
function CargarPágina(){
	window.location.reload();
}
function Cabezado() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const NewName = useRef();
  const NewLastName = useRef();
  const NewPhone = useRef();

  const Enviar = () => {
    EnviarDatos(nombre, apellido, telefono);
  };
  const ObtenerNombre = (event) => {
    setNombre(event.target.value);
  }
  const ObtenerApellido = (event) => {
    setApellido(event.target.value);
  }
  const ObtenerTelefono = (event) => {
    setTelefono(event.target.value);
  }
  return (
    <div className="table100 ver3 m-b-110">
      <div className="table100-head">
        <table>
          <thead>
            <tr className="head">
              <th className="nombre">Nombre</th>
              <th className="">
                <input type="text" ref={NewName} onChange={(ObtenerNombre)} required />
              </th>
              <th className="">Apellido</th>
              <th className="">
                <input type="text" ref={NewLastName} onChange={ObtenerApellido} required />
              </th>
              <th className="">Teléfono</th>
              <th className="">
                <input type="text" required ref={NewPhone} onChange={ObtenerTelefono}/>
              </th>
              <th className="">
                <button className="Agregar" onClick={Enviar}>
                  Agregar contacto
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
function Listado() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://www.raydelto.org/agenda.php")
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);
  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table100 ver3 m-b-110">
            <div className="table100-head">
              <table>
                <thead>
                  <tr className="row100 head">
                    <th className="cell100 column1">Nombre</th>
                    <th className="cell100 column3">Apellido</th>
                    <th className="cell100 column5">Teléfono</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div id="hey">{
              usuarios.map(item => (
                <div className="table100-body js-pscroll" key="item.id">
                  <table>
                    <tbody><tr className="row100 body">
                      <td className="cell100 column1">{item.nombre}</td>
                      <td className="cell100 column3">{item.apellido}</td>
                      <td className="cell100 column5">{item.telefono}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              ))
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
