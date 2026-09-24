import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

export default api;
// axios is http method its http clinet
// its used to send the req frontend to backend 
// like GET , POST , PUT , DELETE
// const api=axios.create({
  //  baseURL:"http://localhost:3000/api/tenders", its a instance of this librarst will be created 
//});
// if we dont create this so each req we write this like /api/tenders/add
// why we write this path becuase
// here e call this in each req thats gors to tenderRoutes file ok ! then if we /add then it call the add file 