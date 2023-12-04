import axios from "axios";
import { Link } from "react-router-dom"
import { withSwal } from 'react-sweetalert2';


function UsersRow ({user, handleClick}) {
    return (
        <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-bodydark2">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>

                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.companyName}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                    <Link to={`/admin/user/edit/${user._id}`}><button type="button" className="bg-success px-2 py-1 gap-1 rounded-md text-white flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                        Edit</button></Link>
                    <button type="button" onClick={handleClick} className="bg-danger px-2 py-1 gap-1 rounded-md text-white flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                        Delete</button>
                </div>
            </li>
    )
}


function UsersRowWithSwal(props) {
    const { swal, setIsUserDeleted, ...rest } = props;
    function handleClick() {
      
        swal.fire({
            title: `You want to delete: ${rest.user.name}`,
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            CancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#D34053'
        }).then(reslut => {
          const id = rest.user._id
          if (reslut.isConfirmed) {
            axios.delete(`users/delete/${id}`).then(() => {
                setIsUserDeleted(prev => !prev)
            })
          }
        });
    }
    return <UsersRow {...rest} handleClick={handleClick} />;

}

export default withSwal(UsersRowWithSwal);
