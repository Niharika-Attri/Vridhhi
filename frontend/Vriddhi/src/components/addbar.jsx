import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import plusIcon from '../assets/plus.svg';
import  axios  from "axios";
import Notification from "./notification";
import "react-toastify/dist/ReactToastify.css"; 

function AddBar({ refreshDashboard }){    
    const[isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: [],
        date_planted: '',
        present_height: '',
        initial_height: ''
    });    

        const handleChange = (e) => {
        const { name, value } = e.target;

        if(name == 'category'){
            setFormData(prevData => ({
                ...prevData,
                category : value
                }));
        }
        else if (name === 'present_height' || name === 'initial_height') {
            const intValue = value ? parseInt(value, 10) : '';

        setFormData(prevData => {
            // Validation: Ensure initial_height is never greater than present_height
            if (name === 'initial_height' && intValue > prevData.present_height) {
                setErrorMessage("Initial height cannot be greater than present height.");
                return prevData; // Do not update state
            } else {
                setErrorMessage(""); 
            }

            return {
                ...prevData,
                [name]: intValue
            };
        });
        }
        else if (name === 'date_planted') {
            // Ensure date is stored as a string
            setFormData(prevData => ({
                ...prevData,
                [name]: String(value)
            }));
        } else{
            setFormData(prevData => ({
                ...prevData,
                [name]: value
                }));
        }
        
        };

        const handleSelectChange = (selectedOptions) => {
            const categoryValues = selectedOptions.map(option => option.value);
        
            setFormData(prevData => ({
            ...prevData,
            category: categoryValues
            }));
        };

        const handleNameChange = (selectedOption) => {
            setFormData(prevData => ({
                ...prevData,
                name: selectedOption ? selectedOption.value : ''
            }));
        }

        const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    if (formData.date_planted > today) {
        setErrorMessage("Date Planted cannot be in the future.");
        return;
    } else {
        setErrorMessage(""); // Clear error message if validation passes
    }
    
        console.log();
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
        
        try{
            const response = await axios.post('http://localhost:8000/plant/add', formData);
            console.log('response: ', response);
            setSuccessMessage(response.data['message'])

            if (response.data['statuscode'] === 200) {
                setSuccessMessage(response.data['message'])
                console.log("Plant data added successfully:", successMessage)
                
                // Reset the form after successful submission
                setFormData({
                    name: '',
                    description: '',
                    category: [],
                    date_planted: '',
                    present_height: '',
                    initial_height: ''
                });
                refreshDashboard();
                alert("Plant added successfully!");
            }else{
                setErrorResponse(response.data['message'])
                alert("An error occured: "+ errorResponse)
                console.log('an error occured ', errorResponse);
            }
        }catch (error) {
            console.error("Error adding the plant:", error);
            alert("Failed to add the plant!");
        }

    };

    const category = [
        { value: "flower", label: "Flower" },
        { value: "vegetable", label: "Vegetable" },
        { value: "fruit", label: "Fruit" },
        { value: "houseplant", label: "House Plant" },
        
    ];

    const names = [
        { value: "aloe vera", label: "Aloe Vera" },
        { value: "sunflower", label: "Sunflower" },
        { value: "hibiscus", label: "Hibiscus" },
        { value: "rose", label: "Rose" },
        { value: "tulsi", label: "Tulsi" },
        { value: "methi", label: "Methi" },
        
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }


    useEffect(() => {
        const handleClickOutside = (Event) =>{
            if (dropdownRef.current && !dropdownRef.current.contains(Event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return(
        
        <div className="flex relative w-full mt-4 h-9 bg-white rounded-full mb-4 text-black" ref={dropdownRef}>
            {errorMessage && <Notification message={errorMessage} type="error" />}
            {successMessage && <Notification message={successMessage} type="success" />}

            <input className="flex w-full bg-white rounded-full focus:outline-none pl-6" onClick={toggleDropdown}/>

            {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-md rounded-md p-4 z-10">
                <form id="submitForm" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="mb-2 text-black">
                            <label className="block text-gray-700 mb-1">Name:</label>
                            <Select
                                required
                                id="name"
                                name="name"
                                options={names}
                                className="basic-select "
                                classNamePrefix="select"
                                styles={{
                                    valueContainer: (provided) => ({
                                        ...provided,
                                        maxHeight: '38px',   
                                        overflowY: 'auto',   
                                        }),
                                }}
                                value={names.find(option => option.value === formData.name) || null}
                                onChange={handleNameChange}
                            />
                        </div>
                        
                        <div className="mb-2 text-black">
                            <label className="block text-gray-700 mb-1">Category:</label>
                            <Select
                                required
                                id="options"
                                name="category"
                                options={category}
                                isMulti
                                className="basic-select  "
                                classNamePrefix="select"
                                styles={{
                                    valueContainer: (provided) => ({
                                        ...provided,
                                        maxHeight: '38px',   
                                        overflowY: 'auto',   
                                        }),
                                }}
                                value={category.filter(option => formData.category.includes(option.value))}
                                onChange={handleSelectChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Description:</label>
                            <input
                                required
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter book description"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Date Planted:</label>
                            <input
                                required
                                type="date"
                                name="date_planted"
                                value={formData.date_planted}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Present Height:</label>
                            <input
                                type="number"
                                name="present_height"
                                placeholder="Enter present height"
                                value={formData.present_height}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block text-gray-700 mb-1">Initial Height:</label>
                            <input
                                type="number"
                                name="initial_height"
                                value={formData.initial_height}
                                onChange={handleChange}
                                placeholder="Enter initial height"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        
                    </div>
                  
                </form>
              </div>
            )}
            <button className=" relative items-center justify-center w-[38px] bg-emerald-500 rounded-full py-4"
                name="submitbutton"
                form="submitForm"
                type="submit"
            
            >
                <div     className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center bg-white w-6 h-6 rounded-full shadow-md" style={{ left: "5px" }}>
                    <img src={plusIcon} alt="plus icon"/>
                </div>
            </button>
        </div>
        
    )
}

export default AddBar