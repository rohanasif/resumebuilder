import PropTypes from "prop-types";
const SingleInputForm = ({
  inputType,
  inputName,
  inputId,
  inputPlaceholder,
  setInputType,
  setInputName,
  setInputId,
  setInputPlaceholder,
  handleSingleSubmit,
}) => {
  return (
    <form>
      <h2>
        Add Single Input - Click on &quot;Add Input&quot; once you fill the
        input attributes
      </h2>
      <label htmlFor="inputtype">Input Type:</label>
      <input
        type="text"
        id="inputtype"
        name="inputtype"
        placeholder="Enter Input Type (e.g. text, email, number etc."
        value={inputType}
        required
        onChange={(e) => setInputType(e.target.value)}
      />
      <label htmlFor="inputname">Input Name:</label>
      <input
        type="text"
        id="inputname"
        name="inputname"
        placeholder="Enter Input Name"
        value={inputName}
        required
        onChange={(e) => setInputName(e.target.value)}
      />
      <label htmlFor="inputId">Input Id:</label>
      <input
        type="text"
        id="inputId"
        name="inputId"
        placeholder="Enter Input Id"
        value={inputId}
        required
        onChange={(e) => setInputId(e.target.value)}
      />
      <label htmlFor="inputplaceholder">Input Placeholder:</label>
      <input
        type="text"
        id="inputplaceholder"
        name="inputplaceholder"
        placeholder="Enter Input Placeholder"
        value={inputPlaceholder}
        required
        onChange={(e) => setInputPlaceholder(e.target.value)}
      />
      <button onClick={handleSingleSubmit}>Add Input</button>
    </form>
  );
};

SingleInputForm.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  setInputType: PropTypes.func.isRequired,
  setInputName: PropTypes.func.isRequired,
  setInputId: PropTypes.func.isRequired,
  setInputPlaceholder: PropTypes.func.isRequired,
  handleSingleSubmit: PropTypes.func.isRequired,
};

export default SingleInputForm;
