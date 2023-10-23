import PropTypes from "prop-types";

const MultiInputForm = ({
  fields,
  inputFor,
  setFields,
  setInputFor,
  generateMultiForm,
}) => {
  return (
    <div>
      <form>
        <label htmlFor="fields">Enter number of fields</label>
        <input
          type="number"
          name="fields"
          id="fields"
          value={fields}
          onChange={(e) => setFields(e.target.value)}
          required
        />
        <label htmlFor="inputfor">What is the input for?</label>
        <input
          type="text"
          id="inputfor"
          name="inputfor"
          placeholder="Input for..."
          value={inputFor}
          onChange={(e) => setInputFor(e.target.value)}
          required
        />
        <button onClick={generateMultiForm}>Generate</button>
      </form>
    </div>
  );
};

MultiInputForm.propTypes = {
  fields: PropTypes.string.isRequired,
  inputFor: PropTypes.string.isRequired,
  setFields: PropTypes.func.isRequired,
  setInputFor: PropTypes.func.isRequired,
  generateMultiForm: PropTypes.func.isRequired,
};

export default MultiInputForm;
