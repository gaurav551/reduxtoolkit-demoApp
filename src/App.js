import "./App.css";
import AlertModal from "./components/ui/Modal";
import RouterProvider from "./components/route/RouteProvider";

function App() {
  return (
    <div>
       <RouterProvider/>
       <AlertModal />
      
    </div>
  );
}

export default App;
