import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(
    JSON.parse(localStorage.getItem("inputData")) || { single: [], multi: [] }
  );
  const [multiInputId, setMultiInputId] = useState(2);

  const { single: singleInputs, multi: multiInputs } = inputData;

  const addInputSet = (inputSet, defaultPlaceholder) => {
    const updatedMultiInputs = [...multiInputs];
    const newInputSet = {
      inputFor: inputSet.inputFor,
      inputs: inputSet.inputs.map((input, index) => ({
        id: `${inputSet.inputFor}_${multiInputId}_set${index}`,
        value: defaultPlaceholder,
      })),
    };
    updatedMultiInputs.splice(
      multiInputs.indexOf(inputSet) + 1,
      0,
      newInputSet
    );
    setInputData((prevInputData) => ({
      ...prevInputData,
      multi: updatedMultiInputs,
    }));
    setMultiInputId(multiInputId + 1);
  };

  const isLastInputSetForCategory = (inputSet) => {
    const category = inputSet.inputFor;
    const remainingInputSetsForCategory = multiInputs.filter(
      (set) => set.inputFor === category
    );
    return remainingInputSetsForCategory.length <= 1;
  };

  const removeInputSet = (inputSet) => {
    if (isLastInputSetForCategory(inputSet)) {
      return;
    }

    const updatedMultiInputs = multiInputs.filter((set) => set !== inputSet);
    setInputData((prevInputData) => ({
      ...prevInputData,
      multi: updatedMultiInputs,
    }));
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const submitCVData = (e) => {
    e.preventDefault();

    const formData = {
      singleInputs: singleInputs.map((input) => ({
        type: input.type,
        name: input.name,
        id: input.id,
        value: document.getElementById(input.id).value, // Get the input value
      })),
      multiInputs: multiInputs.map((inputSet) => ({
        inputFor: inputSet.inputFor,
        inputs: inputSet.inputs.map((input) => ({
          id: input.id,
          value: document.getElementById(input.id).value, // Get the input value
        })),
      })),
    };

    localStorage.setItem("formData", JSON.stringify(formData)); // Store the data in local storage

    navigate("/output");
  };

  return (
    <div>
      <h2>Single Inputs:</h2>
      {singleInputs?.map((input, index) => (
        <input
          key={index}
          type={input.type}
          name={input.name}
          id={input.id}
          placeholder={input.placeholder}
        />
      ))}
      <h2>MultiInputs:</h2>
      {multiInputs?.map((inputSet, index) => (
        <div key={index}>
          <h3>{inputSet.inputFor}:</h3>
          {inputSet.inputs?.map((input, inputIndex) => (
            <input
              key={inputIndex}
              type="text"
              id={input.id}
              placeholder={input.value}
            />
          ))}
          <button
            type="button"
            onClick={() => addInputSet(inputSet, inputSet.inputs[0].value)}
          >
            Add {inputSet.inputFor}
          </button>
          <button type="button" onClick={() => removeInputSet(inputSet)}>
            Remove {inputSet.inputFor}
          </button>
        </div>
      ))}
      <button onClick={goBack}>Go back</button>
      <button onClick={submitCVData}>View CV</button>
    </div>
  );
};

export default Input;
