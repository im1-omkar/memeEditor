import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-screen h-25 bg-amber-300 flex'>
        <div className='flex-4'>Header</div>
        <nav className='flex-1 justify-between'>
            <Link to='/'>Home</Link>
            <Link to='/editor'>Editor</Link>
        </nav>
    </div>
  )
}

export default Header