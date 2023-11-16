import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import { AdminPanelSettings } from "@mui/icons-material";
import { CategoryOutlined } from "@mui/icons-material";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { EscalatorWarningOutlined } from "@mui/icons-material";
import { FemaleOutlined } from "@mui/icons-material";
import { LoginOutlined } from "@mui/icons-material";
import { MaleOutlined } from "@mui/icons-material";
import { SearchOutlined } from "@mui/icons-material";
import { VpnKeyOutlined } from "@mui/icons-material";

import { UiContext } from "@/context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm.toLowerCase()}`);
  };

  const { push } = useRouter();
  const navigateTo = (url: string) => {
    toggleSideMenu();
    push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"My orders"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/men")}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Men"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/women")}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Women"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/kid")}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Kids"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Enter"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Get out"} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={"Products"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
