// ViewForm.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const ViewForm = ({ formFields }) => {
  const generateFormCode = () => {
    return formFields.map((field, index) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        const optionsCode = field.options
          .map((option, optionIndex) => (
            <div key={optionIndex}>
              <input type={field.type} name={field.name} value={option} />
              {option}
              <br />
            </div>
          ));

        return (
          <div key={index}>
            <label>{field.name}</label>
            <br />
            {optionsCode}
            {field.type === 'radio' && field.defaultChecked && (
              <input
                type={field.type}
                name={field.name}
                value={field.defaultChecked}
                defaultChecked
              />
            )}
          </div>
        );
      } else if (field.type === 'dropdown') {
        const optionsCode = field.options.map((option, optionIndex) => (
          <option key={optionIndex} value={option}>
            {option}
          </option>
        ));

        return (
          <div key={index}>
            <label>{field.name}</label>
            <br />
            <select name={field.name}>{optionsCode}</select>
            <br />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <label>{field.name}</label>
            <br />
            <input type={field.type} name={field.name} />
            <br />
          </div>
        );
      }
    });
  };

  const handleSaveForm = () => {
    // Generate the form code as a React component
    const formCode = generateFormCode();

    // Convert JSX code to a string
    const formCodeString = `import React from 'react';\n\nconst MyForm = () => {\n  return (\n${ReactDOMServer.renderToStaticMarkup(
      <form>{formCode}</form>
    )}\n  );\n};\n\nexport default MyForm;\n`;

    // Generate and download the JSX file
    const blob = new Blob([formCodeString], { type: 'text/jsx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generatedForm.jsx';
    a.click();
  };

  return (
    <div>
      <h2>Generated Form</h2>
      <form>{generateFormCode()}</form>

      {/* Button to save the form React code */}
      <button onClick={handleSaveForm} style={{ marginTop: '10px' }}>
        Save Form
      </button>
    </div>
  );
};

export default ViewForm;
