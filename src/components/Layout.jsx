import {Outlet, Link, useLocation} from 'react-router-dom'

function Layout() {
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-semibold text-center text-white">CRM - Clientes</h2>
        <nav className="mt-10">
          <Link 
            className={`${location.pathname === '/' ? 'text-blue-100 bg-blue-800' : 'text-white bg-'} text-xl block mt-2 hover:text-blue-300 transition duration-200 p-3 rounded-lg`} 
              to="/">
                Clientes 
          </Link>
          <Link 
            className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-100 bg-blue-800' : 'text-white'} text-xl p-3 block mt-2 hover:text-blue-300 transition duration-200 rounded-lg`} 
            to="/clientes/nuevo">
              Nuevo cliente
          </Link>
        </nav>
      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;