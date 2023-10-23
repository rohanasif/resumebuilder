import PropTypes from "prop-types";

const GeneratedFields = ({ multiInputs }) => {
  return (
    <div>
      {multiInputs.map((input, index) => {
        return (
          <input
            key={index}
            type="text"
            placeholder={input.placeholder}
            id={input.id}
            required
          />
        );
      })}
    </div>
  );
};

GeneratedFields.propTypes = {
  multiInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GeneratedFields;
