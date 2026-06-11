import Link from "next/link";

async function fetchGitHubUsers() {
  const res = await fetch("https://api.github.com/search/users?q=greg", {
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}

const GitHubUsersPage = async () => {
  const users = await fetchGitHubUsers();

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-3xl font-bold mb-6">GitHub Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Repos</th>
          </tr>
        </thead>
        <tbody>
          {users.items.map((user) => (
            <tr key={user.id}>
              {/* NAME COLUMN */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.avatar_url} alt={user.login} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.login}</div>
                    <div className="text-sm opacity-50">{user.id}</div>
                  </div>
                </div>
              </td>

              {/* GITHUB URL COLUMN */}
              <td>
                <Link href={user.html_url} className="btn btn-link" target="_blank">
                  View on GitHub
                </Link>
              </td>

              {/* REPOS COLUMN */}
              <td>
                <Link
                  href={`/githubusers/${user.login}`}
                  className="btn btn-link"
                >
                  Go to Repos
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GitHubUsersPage;
