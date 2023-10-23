import { useState } from "react";
import SingleInputForm from "../components/SingleInputForm";
import MultiInputForm from "../components/MultiInputForm";
import GeneratedFields from "../components/GeneratedFields";
import { useNavigate } from "react-router-dom";

const FormGenerator = () => {
  const [category, setCategory] = useState("");
  const [inputType, setInputType] = useState("text");
  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [singleInputs, setSingleInputs] = useState([]);
  const [fields, setFields] = useState("");
  const [inputFor, setInputFor] = useState("");
  const [multiInputs, setMultiInputs] = useState([]);
  const [inputSets, setInputSets] = useState([]);
  const [inputs, setInputs] = useState({
    single: singleInputs,
    multi: inputSets,
  });
  const navigate = useNavigate();

  const handleSingleSubmit = (e) => {
    e.preventDefault();

    const isDuplicateId = singleInputs.some((input) => input.id === inputId);

    if (isDuplicateId) {
      alert("Input with this ID already exists. Please use a different ID.");
      return;
    }

    const singleInputData = {
      type: inputType,
      name: inputName,
      id: inputId,
      placeholder: inputPlaceholder,
    };
    const updatedSingleInputs = [...singleInputs, singleInputData];
    setSingleInputs(updatedSingleInputs);
    localStorage.setItem(
      "inputData",
      JSON.stringify({ ...inputs, single: updatedSingleInputs })
    );
    setInputType("");
    setInputName("");
    setInputId("");
    setInputPlaceholder("");
  };

  const generateMultiForm = (e) => {
    e.preventDefault();
    const numberOfFields = parseInt(fields);
    const newMultiInputs = [];
    for (let i = 0; i < numberOfFields; i++) {
      const uniqueId = `${inputFor}_input_${i}`;
      newMultiInputs.push({
        id: uniqueId,
        placeholder: `Enter field ${i + 1} for ${inputFor}`,
      });
    }
    setMultiInputs(newMultiInputs);
  };

  const handleMultiSubmit = (e) => {
    e.preventDefault();

    const inputSetData = [];
    multiInputs.forEach((input) => {
      const inputValue = document.getElementById(input.id).value;
      inputSetData.push({
        id: input.id,
        value: inputValue,
      });
    });

    const updatedInputSets = [...inputSets, { inputFor, inputs: inputSetData }];
    setInputSets(updatedInputSets);

    const oldData = JSON.parse(localStorage.getItem("inputData"));
    const updatedInputs = { ...oldData, multi: updatedInputSets };

    setInputs(updatedInputs);
    localStorage.setItem("inputData", JSON.stringify(updatedInputs));
    setMultiInputs([]);
    setFields("");
    setInputFor("");
  };

  const submitInputs = (e) => {
    e.preventDefault();
    navigate("/input");
  };

  return (
    <div>
      <form>
        <input
          type="radio"
          id="single"
          name="category"
          value="single"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="single">Input with single field</label>
        <input
          type="radio"
          id="multi"
          name="category"
          value="multi"
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="multi">Input with multiple fields</label>
      </form>
      {category === "single" ? (
        <SingleInputForm
          inputType={inputType}
          inputName={inputName}
          inputId={inputId}
          inputPlaceholder={inputPlaceholder}
          setInputType={setInputType}
          setInputName={setInputName}
          setInputId={setInputId}
          setInputPlaceholder={setInputPlaceholder}
          handleSingleSubmit={handleSingleSubmit}
        />
      ) : category === "multi" ? (
        <div>
          <MultiInputForm
            fields={fields}
            inputFor={inputFor}
            setFields={setFields}
            setInputFor={setInputFor}
            generateMultiForm={generateMultiForm}
          />
          <GeneratedFields multiInputs={multiInputs} />
          <button onClick={handleMultiSubmit}>Add MultiInput Set</button>
        </div>
      ) : null}
      <button onClick={submitInputs}>Go to CV Form</button>
    </div>
  );
};

export default FormGenerator;
