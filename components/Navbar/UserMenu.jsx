'use client'
import { LoginModal } from "../Auth/LoginModal"


function UserMenu({session}) {
  return (
    <div className='relative'>
        <div className="flex items-center gap-4">
            <button 
            onClick={()=>{}}
            className='
            hidden
            md:block
            text-lg
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            '
            >
                Airbnb your home
            </button>
            <LoginModal session={session}/>
        </div>      
    </div>
  )
}

export default UserMenu