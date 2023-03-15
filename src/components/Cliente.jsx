import {useNavigate, Form, redirect} from 'react-router-dom'
import { eliminarCliente } from '../data/clientes';

export async function action({params}){
  await eliminarCliente(params.clienteId);
  return redirect ('/');
}

function Cliente({cliente}) {
  const navigate = useNavigate();
  const {nombre, empresa, email, telefono, id} = cliente;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-xl text-gray-800">{nombre}</p>
        <p className="text-zinc-400 text-sm">{empresa}</p>
      </td>

      <td className="p-6 text-center">
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-semibold">Email: </span>{email}</p>
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-semibold">Teléfono: </span>{telefono}</p>
      </td>

      <td className="p-6 space-x-5 text-center">
        <button 
          type="button"
          className="text-blue-600 hover:text-blue-700 transition duration-300 text-xs uppercase font-bold"          
          onClick={() => navigate(`/clientes/${id}/editar`)}
          >       
          Editar   
        </button>
        <Form
          method='post'
          action={`/clientes/${id}/eliminar`}
          onSubmit={e => {
            if(!confirm('¿Deseas eliminar este cliente?')) {
              e.preventDefault();
            }
          }}
        >
          <button 
            type="submit"
            className="text-red-600 hover:red-blue-700 transition duration-300 text-xs uppercase font-bold"          
          >       
            Eliminar  
          </button>
        </Form>
      </td>
    </tr>
  )
}

export default Cliente;