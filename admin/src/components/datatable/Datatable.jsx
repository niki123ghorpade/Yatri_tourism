import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns,userRows } from "../../datatablesource";
import {Link, useLocation} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
const Datatable=({columns})=>{
    const location=useLocation();
    const path=location.pathname.split("/")[1];
    const [list,setList]=useState([]);
   const {data,loading,error}=useFetch(`/${path}`);
   useEffect(()=>{
    console.log("data:", data);
    setList(data);
   },[data]);
    const handleDelete= async (id)=>{
        try{
            await axios.delete(`/${path}/${id}`)
            setList(list.filter((item)=>item._id!==id));

        }catch(err){}
       

    }
    const actionColumn=[{field:"action",headerName:"Action",width:200,renderCell:(params)=>{
         const isEnquiryPage = location.pathname.includes("enquiries");
         let statusColor = "";

         // Define background color for different statuses
         switch (params.row.status) {
             case "Pending":
                 statusColor = "lightpink";
                 break;
             case "Contacted":
                 statusColor = "lightgreen";
                 break;
             case "Checked":
                 statusColor = "lightblue";
                 break;
             default:
                 statusColor = "transparent";
                 break;
         }
        return(
            <div className="cellAction">
                     <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton" onClick={()=>handleDelete(params.row._id)}>Delete</div>
    {isEnquiryPage && <div className="status" style={{ backgroundColor: statusColor }}>{params.row.status || 'Pending'}</div>}
            </div>
        )

    }}]
    return(
        <div className="datatable">
            <div className="datatableTitle">
            {!location.pathname.includes("enquiries") && (
                    <>
                        Add New User
                        <Link to={`/${path}/new`} className="link">
                            Add New
                        </Link>
                    </>
                )}
            </div>
        <DataGrid className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize= {9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
        rowHeight={80} // Adjust row height as needed
        columnWidth={200} // Adjust column width as needed
      />
        </div>
    )
}
export default Datatable;