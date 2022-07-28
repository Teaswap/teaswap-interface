import * as React from 'react';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { NormalButton } from '../NFTButton';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { IoIosMore } from 'react-icons/io'


export default function ProfileMenu({isVendor}: {isVendor?: boolean}) {
  const {t} = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <IoIosMore size="30"/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: '35ch',
          },
        }}
      >
          {isVendor && (
            <NavLink style={{ minWidth: "fit-content", display: 'block' }} to={"#"}>
              <NormalButton className="btn-sm-100">{t("Buy Token")}</NormalButton>
            </NavLink>
          )}
          <NavLink style={{ minWidth: "fit-content", margin: '10px 0', display: 'block' }} to={"/nft"}>
            <NormalButton className="btn-sm-100">{t("Buy NFT")}</NormalButton>
          </NavLink>
          {isVendor && (
            <NavLink
              style={{ minWidth: "fit-content", display: 'block' }}
              to={"/nft/products/post"}
            >
              <NormalButton className="btn-sm-100">
                {t("Create NFT")}
              </NormalButton>
            </NavLink>
          )}
      </Menu>
    </div>
  );
}
