import React, { useState } from 'react';
import axios from 'axios';
import Emoji from './Emoji';

const AddForm = props => {

    const [entry, setEntry] = useState({
        bedTime: '00:00',
        wakeTime: '00:00',
        mood: 1
    })

    const handleChange = e => {
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('https://sleepsavy.herokuapp.com/', entry)
            .then(res => {
                console.log(res.data);
                props.history.push('/home');
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div className="add-form-container">
            <h1>Add Sleep Entry</h1>
            <form className="add-form" onSubmit={handleSubmit}>
                <label className="time-label"> Bed Time:
                <input className="time-input" 
                    type="time"
                    name="bedTime"
                    value={entry.bedTime}
                    onChange={handleChange}
                />
                </label>

                <label className="time-label"> Wake Time:
                <input className="time-input" 
                    type="time"
                    name="wakeTime"
                    value={entry.wakeTime}
                    onChange={handleChange}
                />
                </label>

                <label className="time-label">Mood when you wake up:
                
                <select className="select-input" name="mood" onChange={handleChange}>
                    <option value='mood not selected'>Choose Mood</option>
                    <Emoji symbol="😡" value={1}/>
                    <Emoji symbol="😐" value={2}/>
                    <Emoji symbol="🙂" value={3}/>
                    <Emoji symbol="😍" value={4}/>
                </select>
                
                </label>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
};

export default AddForm