import Repos from "../../components/Repos";

const UserReposPage = ({ params: { user } }) => {
  return (
    <div className="p-4">
      <Repos user={user} />
    </div>
  );
};

export default UserReposPage;
