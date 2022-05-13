// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import Logo from '../../../../assets/images/logo/logo_new.png'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <span className='brand-logo'>
          <img width='60%' src={Logo} alt='logo' />
        </span>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
