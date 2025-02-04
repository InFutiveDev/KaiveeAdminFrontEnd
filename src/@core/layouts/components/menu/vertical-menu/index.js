// ** React Imports
import { Fragment, useState, useRef, useEffect } from "react";

// ** Vertical Menu Items Array
import navigation from "@src/navigation/vertical";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_MENU_WITHOUT_OFFSET,
  GET_MENU_BY_ADMIN,
} from "../../../../../redux/actions/menu";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  // ** Props
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin } = props;

  // ** Store value
  const { menuByAdmin } = useSelector((store) => store.menuByAdminReducer);
  // const menuByAdmin = {
  //   msg: "Request Success",
  //   data: {
  //     data: [
  //       {
  //         _id: "644b8b62a221080914f646b3",
  //         MenuTitle: "Users",
  //         MenuPostion: 1,
  //         MenuURL: "user/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:01:22.051Z",
  //         updatedAt: "2023-04-28T09:01:22.051Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8b73a221080914f646bb",
  //         MenuTitle: "Buildings",
  //         MenuPostion: 2,
  //         MenuURL: "building/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:01:39.251Z",
  //         updatedAt: "2023-04-28T09:01:39.251Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8b85a221080914f646c5",
  //         MenuTitle: "Notification",
  //         MenuPostion: 3,
  //         MenuURL: "notification/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:01:57.977Z",
  //         updatedAt: "2023-04-28T09:01:57.977Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8b9ca221080914f646cf",
  //         MenuTitle: "Packages",
  //         MenuPostion: 4,
  //         MenuURL: "packages",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:02:20.607Z",
  //         updatedAt: "2023-04-28T09:02:20.607Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8bb2a221080914f646da",
  //         MenuTitle: "Transactions",
  //         MenuPostion: 5,
  //         MenuURL: "transactions/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:02:42.823Z",
  //         updatedAt: "2023-04-28T09:02:42.823Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8bc5a221080914f646e4",
  //         MenuTitle: "Micro Market",
  //         MenuPostion: 6,
  //         MenuURL: "micro-market/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:03:01.586Z",
  //         updatedAt: "2023-04-28T09:03:01.586Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8bd6a221080914f646f1",
  //         MenuTitle: "Menu",
  //         MenuPostion: 7,
  //         MenuURL: "menu/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:03:18.324Z",
  //         updatedAt: "2023-04-28T09:03:18.324Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8beba221080914f646fb",
  //         MenuTitle: "Roles",
  //         MenuPostion: 8,
  //         MenuURL: "permissions/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:03:39.135Z",
  //         updatedAt: "2023-04-28T09:03:39.135Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "644b8c09a221080914f64705",
  //         MenuTitle: "Emp. Management",
  //         MenuPostion: 9,
  //         MenuURL: "admin-management/all",
  //         MenuStatus: true,
  //         createdAt: "2023-04-28T09:04:09.813Z",
  //         updatedAt: "2023-04-28T09:04:09.813Z",
  //         __v: 0,
  //       },
  //     ],
  //     pagination: {
  //       offset: 1,
  //       limit: 10000,
  //       total: 9,
  //     },
  //   },
  // };

  // const newNavigations = navigation?.map((item) => {
  //   if (menuByAdmin?.data?.data?.includes(item?.title))
  //     menuByAdmin?.data?.data?.filter(
  //       (ele) => item?.title === ele?.MenuTitle
  //     );
  // });

  const newNavigations = menuByAdmin?.data?.data?.flatMap(({ MenuTitle }) =>
    navigation?.filter(({ title }) => title === MenuTitle)
  );

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    if (menuCollapsed) {
      setMenuHover(true);
    }
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };

  useEffect(() => {
    //  dispatch(GET_MENU_BY_ADMIN());
  }, []);

  return (
    <Fragment>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark",
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu(props)
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: true }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul className="navigation navigation-main">
                <VerticalNavMenuItems
                  items={newNavigations || navigation}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  groupOpen={groupOpen}
                  setGroupOpen={setGroupOpen}
                  routerProps={routerProps}
                  menuCollapsed={menuCollapsed}
                  menuHover={menuHover}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
