import UserDropdown from './UserDropdown'

const NavbarUser = ({ skin, setSkin, show, setShow }) => {
  return (
    <>
      <ul className="nav navbar-nav align-items-center ms-auto">
        <UserDropdown skin={skin} show={show} setShow={setShow} setSkin={setSkin} />
      </ul>
    </>
  )
}
export default NavbarUser
