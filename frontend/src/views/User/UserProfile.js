const UserDetails = ({ user }) => {
  // Convert the date string into a Date object
  const registrationDate = new Date(user.date);

  // Get the formatted date
  const formattedDate = registrationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div className="user-info">
        <div className="details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Register since:</strong> {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
