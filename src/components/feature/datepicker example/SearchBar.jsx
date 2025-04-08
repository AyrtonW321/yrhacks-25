import React, { useState } from 'react'; // Import React and the useState hook
import DatePicker from 'react-datepicker'; // Import the DatePicker component from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for the DatePicker component
import './SearchBar.css'; // Import the CSS for the SearchBar component

// SearchBar component
// Takes the onSearch function as a prop
const SearchBar = ({ onSearch }) => {
    // Manage the component's state with the useState hook
    const [selectedDate, setSelectedDate] = useState(null); // Store the selected date from the search, initialized to null
    const [selectedBudget, setSelectedBudget] = useState(0); // Store the selected budget from the search, initialized to 0

    // Function to handle the input from the user
    const handleInputChange = () => {
        const location = document.querySelector('.location').value; // Get the value of the location input field
        let budget = selectedBudget; // Get the selected budget value

        // Pass the search criteria to the parent component via the onSearch function
        onSearch(location, budget);
    };

    return (
        <div className='searchBarContainer'>
            <h1>Search for your dream destination!</h1>
            <div className='searchBar'>
                <input 
                    placeholder='Location'
                    className='location' 
                    autoComplete='off'
                />
                {/* Use the DatePicker component from react-datepicker to create the calendar */}
                <DatePicker
                    selected={selectedDate} // Bind the selected date to the state
                    onChange={date => setSelectedDate(date)} // Update the state when a new date is selected
                    placeholderText="Select a date"
                    className='date'
                />
                <div className='range'>
                    <label htmlFor="budget">Budget: ${selectedBudget}</label> {/* Display the selected budget */}
                    <div className='field'>
                        <div className='value left'>0</div>
                        {/* Range slider for the budget, min 0 max 3000 */}
                        <input
                            type="range" // Input type range for the slider
                            id="budget"
                            min="0"
                            max="3000"
                            step="100" // Step value for the slider
                            value={selectedBudget} // Bind the value to the state
                            onChange={(e) => setSelectedBudget(parseInt(e.target.value))} // Update the state when the slider value changes
                        />
                        <div className='value right'>3000</div>
                    </div>
                </div>
                <button onClick={handleInputChange}> {/* When the button is clicked, run the handleInputChange function */}
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar; // Export the SearchBar component
