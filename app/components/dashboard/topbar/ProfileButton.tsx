import {useState} from 'react';
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";


const ProfileButton = () => {
    const router = useRouter();
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);

    return (
        <>
          <IconButton size="large" onClick={(e) => setAnchorProfile(e.currentTarget)}>
              <AccountCircle sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Menu
              id="menu-profile"
              anchorEl={anchorProfile}
              keepMounted
              open={Boolean(anchorProfile)}
              onClose={() => setAnchorProfile(null)}
            >
              <MenuItem onClick={() => router.push("/dashboard/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => router.push("/")}>Logout</MenuItem>
            </Menu>  
        </>
    );
};

export default ProfileButton;