import React, { useState } from 'react';
import './UserSettings.css';

const UserSettings = ({ closeModal }) => {
    // Initialize state for form fields
    const [formData, setFormData] = useState({
        username: '',
        allergies: '',
        preferredCuisine: '',
        spice: '',
        diet: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User settings saved:', formData);
        // Here you would typically save the data to your backend
        // Then close the modal
        closeModal();
    };

    return (
        <div className="modalOverlay" onClick={closeModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h1>User Settings</h1>
                <form onSubmit={handleSubmit} className='userSettingsContainer'>
                    <div className='textInputContainer'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            autoComplete='off'
                        />
                    </div>
                    <div className='textInputContainer'>
                        <label htmlFor="allergies">Allergies</label>
                        <div className="allergyInputGroup">
                            <input
                                type="text"
                                id="allergies"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleInputChange}
                                placeholder="Add allergies..."
                            />
                            <button type='button' className='addAllergyButton'>Add</button>
                        </div>
                    </div>
                    <div>
                        <div className="inputBoxContainer">
                            <div className="inputBox">
                                <label>Preferred Cuisine</label>
                                <div className="radioGroup">
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="chinese"
                                            name="preferredCuisine"
                                            value="chinese"
                                            checked={formData.preferredCuisine === 'chinese'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="chinese">Chinese</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="japanese"
                                            name="preferredCuisine"
                                            value="japanese"
                                            checked={formData.preferredCuisine === 'japanese'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="japanese">Japanese</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="mediterranean"
                                            name="preferredCuisine"
                                            value="mediterranean"
                                            checked={formData.preferredCuisine === 'mediterranean'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="mediterranean">Mediterranean</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="mexican"
                                            name="preferredCuisine"
                                            value="mexican"
                                            checked={formData.preferredCuisine === 'mexican'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="mexican">Mexican</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="thai"
                                            name="preferredCuisine"
                                            value="thai"
                                            checked={formData.preferredCuisine === 'thai'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="thai">Thai</label>
                                    </div>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label>Select Spice Level</label>
                                <div className="radioGroup">
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="none"
                                            name="spice"
                                            value="none"
                                            checked={formData.spice === 'none'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="none">No Spice</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="mild"
                                            name="spice"
                                            value="mild"
                                            checked={formData.spice === 'mild'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="mild">Mild</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="medium"
                                            name="spice"
                                            value="medium"
                                            checked={formData.spice === 'medium'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="medium">Medium</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="spicy"
                                            name="spice"
                                            value="spicy"
                                            checked={formData.spice === 'spicy'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="spicy">Spicy</label>
                                    </div>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label>Diet Option</label>
                                <div className="radioGroup">
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="weightLoss"
                                            name="diet"
                                            value="weightLoss"
                                            checked={formData.diet === 'weightLoss'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="weightLoss">Weight Loss</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="muscleGain"
                                            name="diet"
                                            value="muscleGain"
                                            checked={formData.diet === 'muscleGain'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="muscleGain">Muscle Gain</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="healthyEating"
                                            name="diet"
                                            value="healthyEating"
                                            checked={formData.diet === 'healthyEating'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="healthyEating">Healthy Eating</label>
                                    </div>
                                    <div className="radioOption">
                                        <input
                                            type="radio"
                                            id="budgetFriendly"
                                            name="diet"
                                            value="budgetFriendly"
                                            checked={formData.diet === 'budgetFriendly'}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="budgetFriendly">Budget Friendly</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <button type="submit" className="saveButton">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserSettings;