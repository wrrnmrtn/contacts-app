import React, { useState, useEffect } from "react";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);
  const [change, setChange] = useState(false);

  const toggle = (i) => {
    if ( open === i ) {
      return setOpen(null), setChange(false);
    }

    setOpen(i);
    setChange(!change);
  };

  const text = {
    color: "#5c5c5c",
    fontWeight: 700,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          // Fetch data from the specified URL
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        // Logging an error message if it fails
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contacts</h1>
        <p>Total: {users.length}</p>
      </header>

      <div className="Contact-container">
        <div class="contact-table">
          <div class="headings">
            <span class="heading">ID</span>
            <span class="heading">Basic Information</span>
            <span class="heading">Company</span>
            <span class="heading">Phone Number</span>
            <span class="heading">Address</span>
            <span class="heading">Website</span>
          </div>

          {users.map((user, i) => (
            <div class="contacts">
                <span>{user.id}</span>
                <span class="info">
                  {user.name}{"\n"}{user.email}
                </span>
                <span>{user.company.name}</span>
                <span>{user.phone}</span>
                <span>{user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</span>
                <span>{user.website}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="User-list">
        {users.map((user, i) => (
          <List>
              <ListItem disablePadding key={user.id}>
                <ListItemButton>
                    <ListItemText primaryTypographyProps={{ style: text }} primary={user.name} onClick={() => toggle(i)}/>
                    {change ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <div key={user.id} className={ open === i ? 'User-item-show' : 'User-item-hide'}>
                  <h5>User ID: {user.id}</h5>
                  <h5>&#9993; {user.email}</h5>
                  <h5>🏭 {user.company.name}</h5>
                  <h5>📞 {user.phone}</h5>
                  <h5>
                      📍 {user.address.suite}, {user.address.street},{" "}
                      {user.address.city}, {user.address.zipcode}
                  </h5>
                  <h5>🌐 {user.website}</h5>
              </div>
          </List>
        ))}

        
      </div>
    </div>
  );
};

// Exporting the App component for use in other parts of the application
export default App;