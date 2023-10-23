import { useNavigate } from "react-router-dom";
const Output = () => {
  const navigate = useNavigate();
  const cvData = JSON.parse(localStorage.getItem("formData"));
  console.log(cvData);
  const goBack = (e) => {
    e.preventDefault();
    navigate("/input");
  };
  return (
    <div>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default Output;
