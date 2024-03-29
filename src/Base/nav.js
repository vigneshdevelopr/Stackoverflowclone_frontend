import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useHistory } from "react-router-dom";
import { SvgIcon } from "@mui/material";

const settings = ["Doubts","Logout"];

function ResponsiveAppBar() {
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const[doubt, setDoubt]=useState([])
const token = localStorage.getItem('react_token')

useEffect(()=>{
  const getDoubts = async()=>{
    try {
      const response = await fetch('https://stackoverflow-clone-backend-pi.vercel.app/questions',{
        method:"GET",
        headers:{
          "content-type":"application/json",
          "x-auth-token": token
        }
      })
      const data = await response.json()
  setDoubt(data);
  console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  getDoubts();
  },[])

  
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
 
 


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseNavMenu();
    logout();
  };

  
const handleDoubt = ()=>{
  history.push('/doubts')
}
  const logout = () => {
    localStorage.removeItem("react_token");
    localStorage.removeItem("user-name");
    localStorage.removeItem("email");
    history.push("/");
  };

  return (
    <div style={{marginBottom:'4rem'}}>
 <AppBar sx={{ backgroundColor:'orange', color:'black'}} position="fixed">
 <Container maxWidth="xl">
   <Toolbar disableGutters>
     <Typography
       variant="h6"
       noWrap
       component="a"
       href="/"
       sx={{
         mr: 2,
         display: { xs: "none", md: "flex" },
         fontFamily: "monospace",
         fontWeight: 700,
         letterSpacing: ".3rem",
         color: "inherit",
         textDecoration: "none",
       }}
     >
       StackOverFlow
     </Typography>

     <Box sx={{ flexGrow: 1,color:'black', display: { xs: "flex", md: "none" } }}>
      
       <IconButton>

       <Button variant="contained" style={{backgroundColor:'#252525',color:'white'}} onClick={()=>history.push('/addquestion')}>Raise Question</Button>
       </IconButton>
     </Box>
     <Typography
       variant="h5"
       noWrap
       component="a"
       href=""
       sx={{
         mr: 2,
         display: { xs: "flex", md: "none" },
         flexGrow: 1,
         fontFamily: "monospace",
         fontWeight: 700,
         letterSpacing: ".3rem",
         color: "inherit",
         textDecoration: "none",
       }}
     >
       StackOverFlow
     </Typography>
     <Box sx={{ flexGrow: 1,color:'black', display: { xs: "none", md: "flex" } }}>
       
     </Box>

     <Box sx={{ flexGrow: 0,color:'black' }}>
       <Tooltip title="Open settings">
         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
           <Avatar alt={doubt.user }  />
         </IconButton>
       </Tooltip>
       <Menu
         sx={{ mt: "45px" }}
         id="menu-appbar"
         anchorEl={anchorElUser}
         anchorOrigin={{
           vertical: "top",
           horizontal: "right",
         }}
         keepMounted
         transformOrigin={{
           vertical: "top",
           horizontal: "right",
         }}
         open={Boolean(anchorElUser)}
         onClose={handleCloseUserMenu}
       >
         {settings.map((setting) => (
           <MenuItem
             key={setting}
             onClick={
               setting === "Logout" ? handleLogout  :setting === "Doubts" ? handleDoubt : handleCloseUserMenu
             }
           >
             <Typography textAlign="center">{setting}</Typography>
           </MenuItem>
         ))}
       </Menu>
     </Box>
   </Toolbar>
 </Container>
</AppBar>
   
    </div>
  );
}
export default ResponsiveAppBar;
