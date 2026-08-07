function UserCard({ user }) {
  return (
    <div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>College:</strong> {user.college}</p>
      <p><strong>Year:</strong> {user.year}</p>
      <hr />
    </div>
  );
}

export default UserCard;