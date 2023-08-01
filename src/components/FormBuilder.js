import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import ViewForm from './ViewForm'; 
const FormField = ({
  name,
  type,
  options,
  defaultChecked,
  onDelete,
  onTypeChange,
  onOptionsChange,
  onOptionDefaultChange
}) => {
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    onOptionsChange(updatedOptions);
  };

  const handleAddOption = () => {
    onOptionsChange([...options, ""]);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Field Name"
        value={name}
        onChange={(e) => onTypeChange("name", e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => onTypeChange("type", e.target.value)}
      >
        <option value="text">Text</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
        <option value="dropdown">Dropdown</option>
        <option value="date">Date Picker</option> 
        <option value="file">File</option> 
      </select>

      {type === "checkbox" || type === "radio" || type === "dropdown" ? (
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleAddOption}>Add Option</button>
          {type === "radio" ? (
            <div>
              <label>Default Checked:</label>
              <select
                value={defaultChecked}
                onChange={(e) => onOptionDefaultChange(e.target.value)}
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Additional styling for the delete button */}
      <button onClick={onDelete} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
};
// FormBuilder component
const FormBuilder = ({ formFields, setFormFields }) => {
    // const [formFields, setFormFields] = useState([]);

    const handleAddField = () => {
      setFormFields([...formFields, { name: "", type: "text", options: [], defaultChecked: "" }]);
    };
  
    const handleFieldChange = (index, fieldName, fieldValue) => {
      const updatedFields = [...formFields];
      updatedFields[index][fieldName] = fieldValue;
      setFormFields(updatedFields);
    };
  
    const handleOptionChange = (index, options) => {
      const updatedFields = [...formFields];
      updatedFields[index].options = options;
      setFormFields(updatedFields);
    };
  
    const handleOptionDefaultChange = (index, defaultChecked) => {
      const updatedFields = [...formFields];
      updatedFields[index].defaultChecked = defaultChecked;
      setFormFields(updatedFields);
    };
      // Create a history object to navigate programmatically
    const history = useHistory();

  // Handle click event to navigate to the ViewForm component
    const handleViewForm = () => {
    history.push('/view');
    };
  
    // const handleAddOption = (index) => {
    //   const updatedFields = [...formFields];
    //   updatedFields[index].options.push("");
    //   setFormFields(updatedFields);
    // };
    const handleDeleteField = (index) => {
        const updatedFields = formFields.filter((_, i) => i !== index);
        setFormFields(updatedFields);
      };
    
      // const generateJSOutput = () => {
      //   // Create a string representation of the entire form code
      //   const formCode = formFields
      //     .map((field) => {
      //       if (field.type === "checkbox" || field.type === "radio") {
      //         const optionsCode = field.options
      //           .map((option, index) => (
      //             `<div key=${index}>
      //               <input type="${field.type}" name="${field.name}" value="${option}" />
      //               ${option}
      //               <br />
      //             </div>`
      //           ))
      //           .join("");
      
      //         return `
      //           <label>${field.name}</label>
      //           <br />
      //           ${optionsCode}
      //           ${field.type === "radio" && field.defaultChecked ? `
      //             <input type="${field.type}" name="${field.name}" value="${field.defaultChecked}" defaultChecked />
      //             <br />
      //           ` : ''}
      //         `;
      //       } else if (field.type === "dropdown") {
      //         const optionsCode = field.options
      //           .map((option, index) => (
      //             `<option key=${index} value="${option}">${option}</option>`
      //           ))
      //           .join("");
      
      //         return `
      //           <label>${field.name}</label>
      //           <br />
      //           <select name="${field.name}">
      //             ${optionsCode}
      //           </select>
      //           <br />
      //         `;
      //       } else {
      //         return `
      //           <label>${field.name}</label>
      //           <br />
      //           <input type="${field.type}" name="${field.name}" />
      //           <br />
      //         `;
      //       }
      //     })
      //     .join("");
      
      //   // Generate and download the JS file
      //   const jsCode = `import React from 'react';\n\nconst MyForm = () => {\n  return (\n<form>\n${formCode}\n</form>\n  );\n};\n\nexport default MyForm;\n`;
      
      //   const blob = new Blob([jsCode], { type: "text/javascript" });
      //   const url = URL.createObjectURL(blob);
      //   const a = document.createElement("a");
      //   a.href = url;
      //   a.download = "generatedForm.js";
      //   a.click();
      // };
      

      return (
        <div>
          {formFields.map((field, index) => (
            <FormField
              key={index}
              name={field.name}
              type={field.type}
              options={field.options}
              defaultChecked={field.defaultChecked}
              onDelete={() => handleDeleteField(index)}
              onTypeChange={(fieldName, fieldType) =>
                handleFieldChange(index, fieldName, fieldType)
              }
              onOptionsChange={(options) => handleOptionChange(index, options)}
              onOptionDefaultChange={(defaultChecked) =>
                handleOptionDefaultChange(index, defaultChecked)
              }
            />
          ))}
    
          {/* Additional styling for buttons */}
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            {/* + Icon for adding a new field */}
            <button
              onClick={handleAddField}
              style={{
                marginRight: "10px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                color: "#007bff",
              }}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
            {/* <button
              onClick={generateJSOutput}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Generate JS
            </button> */}
            <button
              onClick={handleViewForm}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
              >
              View Form
            </button>
          </div>
        </div>
      );
    };

export default FormBuilder;