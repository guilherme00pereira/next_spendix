import {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";


const LanguageButton = () => {
    const [anchorLanguage, setAnchorLanguage] = useState<null | HTMLElement>(null);

    const handleLanguageSwitch = (lang: string) => {
        setAnchorLanguage(null);
        console.log(lang);
      };

    return (
        <>
          <IconButton onClick={(e) => setAnchorLanguage(e.currentTarget)}>
              <LanguageOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-language"
              anchorEl={anchorLanguage}
              keepMounted
              open={Boolean(anchorLanguage)}
              onClose={() => setAnchorLanguage(null)}
            >
              <MenuItem onClick={() => handleLanguageSwitch("en")}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageSwitch("pt")}>Portuguese</MenuItem>
              <MenuItem onClick={() => handleLanguageSwitch("auto")}>Auto</MenuItem>
            </Menu>  
        </>
    );
};

export default LanguageButton;