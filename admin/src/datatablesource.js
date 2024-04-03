export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "UserName",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img ||  "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}alt="avatar" />
            {params.row.fullname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },

    {
      field: "fullname",
      headerName: "Fullname",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
  ];
  export const packageColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "destinationName",
      headerName: "destinationName",
      width: 150,
    },
    {
      field: "packageType",
      headerName: "Type",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    
   
  ];
  export const enquiriesColumns = [
    { field: "_id", headerName: "ID", width: 250 }, // Assuming you have an ID field for enquiries
    {
      field: "fullname",
      headerName: "Fullname",
      width: 150,
    },
    {
      field: "emailId",
      headerName: "Email",
      width: 150,
    },
    {
      field: "destinationName",
      headerName: "Destination",
      width: 230,
    },
    {
      field: "phoneNo",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  
    // Add more fields as needed for enquiry data
  ];
    // Add more fields as needed for enquiry data
 
  
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];