const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <button className="btn btn-ghost loading">
        <span className="loading loading-spinner loading-md mr-2"></span>
        Loading...
      </button>
    </div>
  );
};

export default LoadingPage;
