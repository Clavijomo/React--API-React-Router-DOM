import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error';
import {agregarCliente} from '../data/clientes'

export async function action({request}) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);

    const email = formData.get('email');

    // Validación
    const errores = [];
        if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)) {
        errores.push('El email no es válido')
    }
    // Retornar datos si hay errores
    if(Object.keys(errores).length) {
        console.log('Sí hay errores');
        return errores;
    }  
    console.log(datos);
    await agregarCliente(datos);  
    return redirect('/');
}

function NuevoCliente() {

  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-semibold text-4xl">Nuevo cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
         <button
         onClick={() => navigate(-1)}
         className="bg-blue-800 text-white px-3 py-1 font-semibold uppercase"
         >Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-8">        
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form
          method="post"          
          noValidate
        >
          <Formulario />
          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-semibold text-white text-lg"
            value="Registrar cliente"
          />
        </Form>        
      </div>
    </>
  )
}

export default NuevoCliente;