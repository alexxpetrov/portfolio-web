// import Login from "../dashboard/features/Auth/Login/Login";

export default async function LoginPage() {
  // Fetch HTML from the Go server
  const htmlRes = await fetch("http://localhost:4000/login");
  const htmlContent = await htmlRes.text();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <Login /> */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Render the additional JSON data fetched from the Go server */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="btn btn-error">Search1</button>
      </div>
    </div>
  );
}
