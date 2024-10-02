import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Header from "./components/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

// Layout component includes the header and page content
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className="font-bpg">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
