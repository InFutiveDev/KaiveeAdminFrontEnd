import { lazy } from "react";

const PagesRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../../views/pages/authentication/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/register",
    component: lazy(() => import("../../views/pages/authentication/Register")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/pages/profile",
    component: lazy(() => import("../../views/pages/profile")),
  },
  {
    path: "/pages/account-settings",
    component: lazy(() => import("../../views/pages/account-settings")),
  },
  {
    path: "/misc/coming-soon",
    component: lazy(() => import("../../views/pages/misc/ComingSoon")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/apps/landing-page/view/:id",
    component: lazy(() => import("../../views/apps/landingPage/view")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/misc/not-authorized",
    component: lazy(() => import("../../views/pages/misc/NotAuthorized")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/misc/maintenance",
    component: lazy(() => import("../../views/pages/misc/Maintenance")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/misc/error",
    component: lazy(() => import("../../views/pages/misc/Error")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
];

export default PagesRoutes;
