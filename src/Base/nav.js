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

const pages = ["Doubts", "Answers", "Company"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
 
  const StackLogo = () => (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 28 28" viewBox="0 0 28 28">
    <path fill="#ffe577" d="m4.55 18.742c.205-2.253 14.158-1.767 17.597-1.242 1.627.249 3.728 8.185.036 8.405s-17.082 1.984-17.633-.882-.165-4.463 0-6.281z"/><path d="m23.5 26h-19c-.276 0-.5-.224-.5-.5v-8c0-.276.224-.5.5-.5h2.05c.276 0 .5.224.5.5v5.5h13.95v-5.5c0-.276.224-.5.5-.5h2c.276 0 .5.224.5.5v8c0 .276-.224.5-.5.5zm-18.5-1h18v-7h-1v5.5c0 .276-.224.5-.5.5h-14.95c-.276 0-.5-.224-.5-.5v-5.5h-1.05z"/><path d="m18.5 22h-10c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h10c.276 0 .5.224.5.5v2c0 .276-.224.5-.5.5zm-9.5-1h9v-1h-9z"/><path d="m18.443 19.245c-.034 0-.068-.003-.102-.01l-9.792-2.032c-.13-.027-.244-.104-.316-.215s-.099-.246-.072-.376l.407-1.958c.056-.271.319-.442.591-.388l9.792 2.032c.13.027.244.104.316.215s.099.246.072.376l-.407 1.958c-.049.236-.257.398-.489.398zm-9.201-2.92 8.812 1.829.203-.979-8.812-1.829z"/><path d="m19.012 16.396c-.076 0-.153-.017-.225-.054l-8.927-4.507c-.118-.06-.208-.164-.25-.29s-.03-.263.03-.381l.901-1.785c.124-.246.426-.345.672-.221l8.927 4.507c.118.06.208.164.25.29s.031.263-.029.382l-.901 1.785c-.089.173-.265.274-.448.274zm-8.254-5.228 8.034 4.056.451-.892-8.034-4.056z"/><path d="m20.311 13.999c-.107 0-.215-.034-.307-.105l-7.822-6.084c-.218-.169-.257-.483-.087-.702l1.228-1.579c.081-.104.201-.172.333-.189.132-.016.264.02.369.102l7.822 6.084c.104.081.172.201.189.333s-.02.264-.102.369l-1.228 1.579c-.099.125-.246.192-.395.192zm-7.12-6.672 7.033 5.47.614-.789-7.033-5.47z"/><path d="m22.32 12.001c-.152 0-.301-.069-.4-.199l-5.877-7.798c-.08-.106-.114-.239-.096-.37s.088-.25.194-.33l1.597-1.204c.221-.166.534-.121.7.099l5.877 7.798c.08.106.114.239.096.37s-.088.25-.194.33l-1.597 1.204c-.09.068-.196.1-.3.1zm-5.178-8.199 5.275 7 .799-.602-5.275-7z"/>
    </SvgIcon>
  );



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseNavMenu();
    logout();
  };

  const doubts = () =>{
    history.push('/doubts')
  }

  const logout = () => {
    localStorage.removeItem("react_token");
    localStorage.removeItem("user-name");
    localStorage.removeItem("email");
    history.push("/");
  };

  return (
    <div>
 <AppBar sx={{ backgroundColor:'orange', color:'black'}} position="static">
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
       <IconButton
         size="large"
         aria-label="account of current user"
         aria-controls="menu-appbar"
         aria-haspopup="true"
         onClick={handleOpenNavMenu}
         color="inherit"
       >
<StackLogo />
       </IconButton>
       <Menu
         id="menu-appbar"
         anchorEl={anchorElNav}
         anchorOrigin={{
           vertical: "bottom",
           horizontal: "left",
         }}
         keepMounted
         transformOrigin={{
           vertical: "top",
           horizontal: "left",
         }}
         open={Boolean(anchorElNav)}
         onClose={handleCloseNavMenu}
         sx={{
           display: { xs: "block", md: "none" },
           color:'black'
         }}
       >
         {pages.map((page) => (
           <MenuItem key={page} onClick={
             page==="Doubts"?doubts:
             
             handleCloseNavMenu}>
             <Typography textAlign="center">{page}</Typography>
           </MenuItem>
         ))}
       </Menu>
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
       {pages.map((page) => (
         <Button
           key={page}
           onClick={
             page==="Doubts"?doubts:

             handleCloseNavMenu}
           sx={{ my: 2, color: "black", display: "block" }}
         >
           {page}
         </Button>
       ))}
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
               setting === "Logout" ? handleLogout : handleCloseUserMenu
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
