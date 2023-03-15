import {Form, useNavigate, useLoaderData, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import { obtenerCliente, actualizarCliente, agregarCliente } from '../data/clientes'
import Error from '../components/Error'

export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)

    if(Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Cliente no encontrado',
        })
    }
    return cliente;
}

export async function action({request, params}) {
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
    
    // Actualizar cliente
    await actualizarCliente(params.clienteId, datos);
    
    await agregarCliente(datos);  
    return redirect('/');
}
 
function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();    

  return (
    <>
      <h1 className="font-semibold text-4xl">Editar cliente</h1>
      <p className="mt-3">Podrás editar los datos de un cliente</p>

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
          <Formulario 
            cliente={cliente}
          />
          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-semibold text-white text-lg"
            value="Guardar cambios"
          />
        </Form>        
      </div>
    </>
  )
}

export default EditarCliente;