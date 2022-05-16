// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import { NavItem } from 'reactstrap'
import NavbarBookmarks from './NavbarBookmarks'
import Logo from '../../../../assets/images/logo/logo_new.png'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>

        <span className='brand-logo'>
          <img width='14%' src={Logo} alt='logo' />
          <span style={{ textAlign: 'center', fontSize: '18px', color: 'green', fontweight: 'bold' }}>Crop Monitoring</span>

        </span>

      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
