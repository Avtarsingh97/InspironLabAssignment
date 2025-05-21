import { NavLink } from "react-router-dom";

NavLink

const NotFound = () => {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 to-black text-white flex flex-col items-center justify-center p-8'>
        <h1 className='text-6xl font-bold text-indigo-500 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-2'>Page Not Found</h2>
        <p className='text-gray-400 mb-6 text-center max-w-md'>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <NavLink
          to='/'
          className='px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition'
        >
          Go to Homepage
        </NavLink>
      </div>
    </>
  );
};

export default NotFound;
