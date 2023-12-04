import { useContext, useEffect, useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,

} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import logoutHandler from '../services/apiCalls'
import { AuthContext } from "../contexts/AuthContext";




export default function PageHeader() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, serIsUser] = useState(false);

  useEffect(() => {
    if (user && user.role === 'Admin') {
      setIsAdmin(true);
      serIsUser(true);

    } else if (user) {
      serIsUser(true);
      setIsAdmin(false);
    }
  }, [user]);

  async function onLogoutClick() {
    await logoutHandler();
    serIsUser(false);
    setIsAdmin(false);
    navigate('/');
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-99999">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className=" w-34"
              src="https://firebasestorage.googleapis.com/v0/b/nextjs-e-commerce-storage.appspot.com/o/fuelImages%2FBG%20PETROL(1).png?alt=media&token=547721da-9a40-417a-8d06-84d293f7d9c3"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          <div className="flex items-center gap-10">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
              Home
            </Link>
            <Link to="/for-us" className="text-sm font-semibold leading-6 text-gray-900">
              For us
            </Link>
            <Link to="/prices" className="text-sm font-semibold leading-6 text-gray-900">
              Today prices
            </Link>
            <Link to="/order" className="text-sm font-semibold leading-6 text-gray-900">
              Make an order
            </Link>
            {isAdmin ? (
              <Link to="/admin" className="bg-meta-4 rounded-lg text-white px-3 py-1 text-base font-semibold  leading-6">
                Dashboard
              </Link>
            ) : null}

          </div>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <div className="flex items-center gap-2">
            {isUser ? (
              <button className="bg-danger rounded-lg text-white px-3 py-1 text-base font-semibold 
              leading-7" type="button"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register" className="bg-warning rounded-lg text-white px-3 py-1 text-base font-semibold  leading-7 ">
                  Register
                </Link>
                <Link to="/login" className="bg-success rounded-lg text-white px-3 py-1 text-base font-semibold  leading-7">
                  Log in
                </Link>
              </>
            )}


          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black text-white px-6 
          py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/nextjs-e-commerce-storage.appspot.com/o/fuelImages%2FBG%20PETROL(1).png?alt=media&token=547721da-9a40-417a-8d06-84d293f7d9c3"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  href="/for-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                >
                  For us
                </Link>
                <Link
                  to="/prices"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Today prices
                </Link>
                <Link
                  to="/order"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Make an order
                </Link>


                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                ) : null}

              </div>
              <div className="py-6 ">
                {isUser ? (
                  <button className="-mx-3 block px-3 py-2.5 text-base font-semibold 
                  leading-7" type="button"
                onClick={onLogoutClick}
              >
                Logout
              </button>
                ) : (
                  <>
                    <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold 
                    leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="-mx-3 block px-3 py-2.5 text-base font-semibold 
                    leading-7"
                >
                  Register
                </Link>
                  </>
                )}
              
               
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}