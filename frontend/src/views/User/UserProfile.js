const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div className="user-info">
        <div className="avatar">
          {/* Usar el código Unicode de un emoji de persona */}
          <span role="img" aria-label="User Avatar">
            👤
          </span>
        </div>
        <div className="details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Agregar más campos de detalles aquí */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
