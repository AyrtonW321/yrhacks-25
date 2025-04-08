import React from 'react';
import './UserSettings.css';

const UserSettings = () => {

    return (
        <>
            <div className="userSettingsHeader">
                <h1>UserSettings</h1>
                <div className='userSettingsContainer'>
                    <div className='textInputContainer'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" />
                    </div>
                    <div className='textInputContainer'>
                        <label htmlFor="allergies">Allergies</label>
                        <input type="text" id="allergies" placeholder="Add any allergies..." />
                    </div>
                    <div class="inputBoxContainer">
                        <div class="inputBox">
                            <select id="">
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
