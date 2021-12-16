import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../../redux/actions/menuAction";
import { menusState$ } from "../../redux/selectors";
import { useOnClickOutside } from "../clickOutside";
import Signln from "../login/Signln";

import { isLogin as actionIslogin } from "../../redux/actions/userAction";
import { toggleLoginState$ } from "../../redux/selectors";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(toggleLoginState$);

  const [toggleInput, setToggleInput] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [togglsubmenu, setTogglsubmenu] = useState(false);

  const refSearch = useRef();
  const refUser = useRef();
  const refSubMenu = useRef([]);

  useOnClickOutside(refSearch, () => setToggleInput(false));

  useEffect(() => {
    dispatch(getMenus.getMenusReq());
  }, [dispatch]);
  let datamenu = useSelector(menusState$);

  const { pathname } = useLocation();

  let activeMenu = -1;
  if (datamenu) {
    activeMenu = datamenu.findIndex((item) => item.path === pathname);
  }

  const handleMouseEnter = (item, check) => {
    if (check !== 0) {
      let _h =
        refSubMenu.current[item].lastChild.childElementCount *
        refSubMenu.current[item].lastChild.firstChild.offsetHeight;
      refSubMenu.current[item].lastChild.style.height = `${_h}px`;
    }
    setTogglsubmenu(false);
  };
  const handleMouseLeave = (item, check) => {
    if (check !== 0) {
      refSubMenu.current[item].lastChild.style.height = 0;
    }
    refSubMenu.current.forEach((el, index) => {
      refSubMenu.current[index].classList.remove("dot");
    });
    setTogglsubmenu(true);
  };
  const handleClickSubmenu = (item, check) => {
    if (togglsubmenu === false) {
      handleMouseEnter(item, check);
      refSubMenu.current[item].classList.add("dot");
    } else {
      handleMouseLeave(item, check);
      refSubMenu.current[item].classList.remove("dot");
    }
    setTogglsubmenu(!togglsubmenu);
  };

  const handleUserClick = () => {
    if (toggleUser === false) {
      let _h =
        refUser.current.lastChild.childElementCount *
        refUser.current.lastChild.firstChild.offsetHeight;
      refUser.current.lastChild.style.height = `${_h}px`;
      refUser.current.lastChild.style.visibility = "visible";
    } else {
      refUser.current.lastChild.style.height = 0;
      refUser.current.lastChild.style.visibility = "hidden";
    }
    setToggleUser(!toggleUser);
    setToggleMenu(false);
  };

  const menus = (
    <div
      id="gnavi"
      className={`c-gnavi ${toggleMenu === true ? "active" : ""}`}
    >
      <ul>
        {datamenu &&
          datamenu.map((item, index) => (
            <li
              ref={(e) => (refSubMenu.current[index] = e)}
              key={index}
              className={`${item.submenu.length !== 0 ? "over " : ""}${
                activeMenu === index ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index, item.submenu.length)}
              onMouseLeave={() => handleMouseLeave(index, item.submenu.length)}
              onClick={() => handleClickSubmenu(index, item.submenu.length)}
            >
              <Link to={item.path}>
                {item.name}
                {item.submenu.length !== 0 ? (
                  <KeyboardArrowDownIcon sx={{ fontSize: 25 }} />
                ) : (
                  ""
                )}
              </Link>
              {item.submenu.length !== 0 ? (
                <ul className="c-gnavi__sub">
                  {item.submenu.map((it, idx) => (
                    <li key={idx}>
                      <Link to={it.path_sub}>{it.name_sub}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className="c-header">
      <div className="l-container">
        <div className="c-header__left">
          <h1 className="c-logo">
            <Link to="/">Xi Store</Link>
          </h1>
          <span className="c-caption">SINCE 2019</span>
        </div>
        {menus}
        <ul className={`c-listicon ${toggleInput === true ? "active" : ""}`}>
          <li>
            <form action="">
              <label
                ref={refSearch}
                onClick={() => setToggleInput(true)}
                className="c-search"
                htmlFor="search"
              >
                <SearchIcon fontSize="inherit" />
                <input
                  id="search"
                  className="c-inputTxt"
                  type="search"
                  name="search"
                  placeholder="Tìm kiếm..."
                />
              </label>
            </form>
          </li>
          <li>
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon fontSize="inherit" />
            </Badge>
          </li>
          <li className="user" ref={refUser} onClick={handleUserClick}>
            <span className="avatar">
              <img
                src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1.jpg"
                alt=""
              />
            </span>
            <KeyboardArrowDownIcon sx={{ fontSize: 25 }} />
            <ul className="c-listuser">
              <li>
                <span onClick={() => dispatch(actionIslogin())}>
                  <LoginIcon />
                  Đăng Nhập
                </span>
              </li>
              <li>
                <Link to="/logout">
                  <LogoutIcon />
                  Đăng Xuất
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <AccountCircleIcon fontSize="inherit" />
                  Tài Khoản
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <AppRegistrationIcon />
                  Đăng Ký
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <div
          className={`c-menutoggle ${toggleMenu === true ? "active" : ""}`}
          onClick={() => {
            setToggleMenu(!toggleMenu);
            setToggleUser(false);
            refUser.current.lastChild.style.height = 0;
            refUser.current.lastChild.style.visibility = "hidden";
          }}
        >
          <span></span>
        </div>
      </div>
      {isLogin && <Signln />}
    </div>
  );
};

export default Header;
