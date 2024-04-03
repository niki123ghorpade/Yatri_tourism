import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './singlepackage.scss'; // Import the CSS file
import EditIcon from '@mui/icons-material/Edit';

const SinglePackage = () => {
  const { packageId } = useParams(); // Get the packageId from URL params
  const [packageData, setPackageData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`/packages/find/${packageId}`);
        setPackageData(response.data); // Set package data in state
        setEditedData(response.data); // Set initial edited data state
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };

    if (packageId) {
      fetchPackage(); // Fetch package data only if packageId exists
    }
  }, [packageId]); // Re-fetch data when packageId changes

  const handleEditClick = () => {
    setEditMode(true); // Switch to edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: name === "destinationName" ? value.split(",") : value,
    }));
  };
   const handleAddPhoto = () => {
    setEditedData((prevData) => ({
      ...prevData,
      photos: [...prevData.photos, ''], // Add an empty string for a new photo
    }));
  };

  const handleDeletePhoto = (index) => {
    setEditedData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index), // Filter out the photo at the specified index
    }));
  };
   const handleAddItem = (itemName) => {
    setEditedData((prevData) => ({
      ...prevData,
      [itemName]: [...prevData[itemName], ''], // Add an empty string for a new item
    }));
  };

  const handleDeleteItem = (itemName, index) => {
    setEditedData((prevData) => ({
      ...prevData,
      [itemName]: prevData[itemName].filter((_, i) => i !== index), // Filter out the item at the specified index
    }));
  };
  const handleAddDayTitle = () => {
    setEditedData((prevData) => ({
      ...prevData,
      daytitle: [...prevData.daytitle, ''], // Add an empty string for a new day title
    }));
  };

  const handleDeleteDayTitle = (index) => {
    setEditedData((prevData) => ({
      ...prevData,
      daytitle: prevData.daytitle.filter((_, i) => i !== index), // Filter out the day title at the specified index
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`/packages/${packageId}`, editedData);
      setPackageData(editedData); // Update packageData with edited data
      setEditMode(false); // Switch back to view mode
    } catch (error) {
      console.error('Error saving package data:', error);
    }
  };

  if (!packageData) {
    return <div className="loading">Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="single-package">
      <div className="edit-icon" onClick={handleEditClick}>
        <EditIcon />
      </div>
      <h2>Package Details</h2>
      {editMode ? (
        <div className="edit-mode">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleChange}
          />
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={editedData.duration}
            onChange={handleChange}
          />
        <label>Social Shares:</label>
          <div>
            {editedData.socialshares.map((share, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={share}
                  onChange={(e) => {
                    const newShares = [...editedData.socialshares];
                    newShares[index] = e.target.value;
                    setEditedData((prevData) => ({
                      ...prevData,
                      socialshares: newShares,
                    }));
                  }}
                />
                <button onClick={() => handleDeleteItem("socialshares", index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleAddItem("socialshares")}>Add Share</button>
          </div>
          <label>Photos:</label>
          <div>
            {editedData.photos.map((photo, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => {
                    const newPhotos = [...editedData.photos];
                    newPhotos[index] = e.target.value;
                    setEditedData((prevData) => ({
                      ...prevData,
                      photos: newPhotos,
                    }));
                  }}
                  />
                     <button onClick={() => handleDeletePhoto(index)}>Delete</button>
              </div>
            ))}
            <button onClick={handleAddPhoto}>Add Photo</button>
          </div>
          <label>Day Titles:</label>
          <div>
            {editedData.daytitle.map((title, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    const newTitles = [...editedData.daytitle];
                    newTitles[index] = e.target.value;
                    setEditedData((prevData) => ({
                      ...prevData,
                      daytitle: newTitles,
                    }));
                  }}
                />
                <button onClick={() => handleDeleteDayTitle(index)}>Delete</button>
              </div>
            ))}
            <button onClick={handleAddDayTitle}>Add Day Title</button>
          </div>
          <label>Day Descriptions:</label>
          <textarea
            name="daydesc"
            value={editedData.daydesc.join('\n')}
            onChange={handleChange}
          />
          <label>Catchphrase:</label>
          <input
            type="text"
            name="catchphrase"
            value={editedData.catchphrase}
            onChange={handleChange}
          />
          <label>Package Description:</label>
          <textarea
            name="packagedesc"
            value={editedData.packagedesc}
            onChange={handleChange}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={editedData.price}
            onChange={handleChange}
          />
          <label>Instagram Posts:</label>
          <div>
            {editedData.igpost.map((post, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={post}
                  onChange={(e) => {
                    const newPosts = [...editedData.igpost];
                    newPosts[index] = e.target.value;
                    setEditedData((prevData) => ({
                      ...prevData,
                      igpost: newPosts,
                    }));
                  }}
                />
                <button onClick={() => handleDeleteItem("igpost", index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleAddItem("igpost")}>Add Post</button>
          </div>
          <label>Main Package:</label>
          <input
            type="checkbox"
            name="mainPackage"
            checked={editedData.mainPackage}
            onChange={handleChange}
          />
          <label>Destination Name:</label>
          <input
            type="text"
            name="destinationName"
            value={editedData.destinationName.join(', ')}
            onChange={handleChange}
          />
          <label>Package Type:</label>
          <input
            type="text"
            name="packageType"
            value={editedData.packageType}
            onChange={handleChange}
          />
         
        </div>
      ) : (
        <div className="view-mode">
          <p>ID: {packageData._id}</p>
          <p>Title: {packageData.title}</p>
          <p>Duration: {packageData.duration}</p>
          <p>Social Shares: {packageData.socialshares.join(', ')}</p>
          <p>Photos:</p>
          <div className="photos-container">
        {packageData.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} />
        ))}
      </div>
          <p>Day Titles: {packageData.daytitle.join(', ')}</p>
          <p>Day Descriptions: {packageData.daydesc.join(', ')}</p>
          <p>Catchphrase: {packageData.catchphrase}</p>
          <p>Package Description: {packageData.packagedesc}</p>
          <p>Price: {packageData.price}</p>
          <p>Instagram Posts: {packageData.igpost.join(', ')}</p>
          <p>Main Package: {packageData.mainPackage ? 'Yes' : 'No'}</p>
          <p>Destination Name: {packageData.destinationName.join(', ')}</p>
          <p>Package Type: {packageData.packageType}</p>
        
        </div>
      )}
      {editMode ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <Link to={`/packages/${packageId}`}>Back</Link>
      )}
    </div>
  );
};

export default SinglePackage;
