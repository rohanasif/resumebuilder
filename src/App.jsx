import "./App.css";
import { Route, Routes } from "react-router-dom";
import FormGenerator from "./routes/FormGenerator";
import Input from "./routes/Input";
import Output from "./routes/Output";
function App() {
  return (
    <Routes>
      <Route path="/" element={<FormGenerator />} />
      <Route path="/input" element={<Input />} />
      <Route path="/output" element={<Output />} />
    </Routes>
  );
}

export default App;
