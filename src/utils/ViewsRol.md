 {isAdmin() ? (
   <>
      <h1>Is Admin</h1>
   </>
  ) : isUser() ? (
    <>
      <h1>Is User</h1>
    </>
  ) : hasNoToken() ? (
    <>
      <AccesoDenegado></AccesoDenegado>
    </>
  ) : null}