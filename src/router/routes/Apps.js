import { lazy } from "react";

const AppRoutes = [
  {
    path: "/apps/user/all",
    exact: true,
    component: lazy(() => import("../../views/apps/user/list")),
  },
  {
    path: "/apps/category/all",
    exact: true,
    component: lazy(() => import("../../views/apps/category/list")),
  },
  {
    path: "/apps/category/add",
    exact: true,
    component: lazy(() => import("../../views/apps/category/add")),
  },
  {
    path: "/apps/category/update/:categoryId",
    exact: true,
    component: lazy(() => import("../../views/apps/category/edit")),
  },
  {
    path: "/apps/test/add",
    exact: true,
    component: lazy(() => import("../../views/apps/test/add")),
  },
  {
    path: "/apps/test/all",
    exact: true,
    component: lazy(() => import("../../views/apps/test/list")),
  },
  {
    path: "/apps/manage/faqs",
    exact: true,
    component: lazy(() => import("../../views/apps/test/Faqs")),
  },
  {
    path: "/apps/test/update/:testId",
    exact: true,
    component: lazy(() => import("../../views/apps/test/edit")),
  },
  {
    path: "/apps/coupon/add",
    exact: true,
    component: lazy(() => import("../../views/apps/coupon/add")),
  },
  {
    path: "/apps/coupon/all",
    exact: true,
    component: lazy(() => import("../../views/apps/coupon/list")),
  },
  {
    path: "/apps/coupon/update/:couponId",
    exact: true,
    component: lazy(() => import("../../views/apps/coupon/edit")),
  },
  {
    path: "/apps/inquiry/all",
    exact: true,
    component: lazy(() => import("../../views/apps/inquiry/list")),
  },
  {
    path: "/apps/feedback/all",
    exact: true,
    component: lazy(() => import("../../views/apps/feedback/list")),
  },
  {
    path: "/apps/corporate-health-enquiry/all",
    exact: true,
    component: lazy(() =>
      import("../../views/apps/corporateHealthEnquiry/list")
    ),
  },
  {
    path: "/apps/banner/all",
    exact: true,
    component: lazy(() => import("../../views/apps/banner/list")),
  },
  {
    path: "/apps/banner/add",
    exact: true,
    component: lazy(() => import("../../views/apps/banner/add")),
  },
  {
    path: "/apps/banner/update/:bannerId",
    exact: true,
    component: lazy(() => import("../../views/apps/banner/edit")),
  },
  {
    path: "/apps/setting",
    exact: true,
    component: lazy(() => import("../../views/apps/setting")),
  },
  {
    path: "/apps/risk/add",
    exact: true,
    component: lazy(() => import("../../views/apps/healthRisk/add")),
  },
  {
    path: "/apps/risk/all",
    exact: true,
    component: lazy(() => import("../../views/apps/healthRisk/list")),
  },
  {
    path: "/apps/habit/add",
    exact: true,
    component: lazy(() => import("../../views/apps/habit/add")),
  },
  {
    path: "/apps/habit/update/:habitId",
    exact: true,
    component: lazy(() => import("../../views/apps/habit/edit")),
  },
  {
    path: "/apps/habit/all",
    exact: true,
    component: lazy(() => import("../../views/apps/habit/list")),
  },
  {
    path: "/apps/subscriber-page/all",
    exact: true,
    component: lazy(() => import("../../views/apps/subscriber/list")),
  },
  {
    path: "/apps/contact-us/all",
    exact: true,
    component: lazy(() => import("../../views/apps/contactUs/list")),
  },
  {
    path: "/apps/prescription-page/all",
    exact: true,
    component: lazy(() => import("../../views/apps/prescription/list")),
  },
  {
    path: "/apps/applie-job/all",
    exact: true,
    component: lazy(() => import("../../views/apps/appliedJob/list")),
  },
  {
    path: "/apps/franchises/all",
    exact: true,
    component: lazy(() => import("../../views/apps/franchises/list")),
  },
  {
    path: "/apps/appointment/all",
    exact: true,
    component: lazy(() => import("../../views/apps/appointment/list")),
  },
  {
    path: "/apps/bio-waste/all",
    exact: true,
    component: lazy(() => import("../../views/apps/biowaste/list")),
  },
  {
    path: "/apps/bio-waste/update/:id",
    exact: true,
    component: lazy(() => import("../../views/apps/biowaste/edit")),
  },
  {
    path: "/apps/bio-waste/add",
    exact: true,
    component: lazy(() => import("../../views/apps/biowaste/add")),
  },
  {
    path: "/apps/landing-page/all",
    exact: true,
    component: lazy(() => import("../../views/apps/landingPage/list")),
  },

  {
    path: "/apps/landing-page/add",
    exact: true,
    component: lazy(() => import("../../views/apps/landingPage/add")),
  },
  {
    path: "/apps/landing-page/update/:id",
    exact: true,
    component: lazy(() => import("../../views/apps/landingPage/edit")),
  },

  {
    path: "/apps/our-team/all",
    exact: true,
    component: lazy(() => import("../../views/apps/ourTeam/list")),
  },
  {
    path: "/apps/our-team/add",
    exact: true,
    component: lazy(() => import("../../views/apps/ourTeam/add")),
  },
  {
    path: "/apps/our-team/update/:id",
    exact: true,
    component: lazy(() => import("../../views/apps/ourTeam/edit")),
  },
  {
    path: "/apps/risk/update/:riskId",
    exact: true,
    component: lazy(() => import("../../views/apps/healthRisk/edit")),
  },
  // {
  //   path: "/apps/media/add",
  //   exact: true,
  //   component: lazy(() => import("../../views/apps/media/add")),
  // },
  // {
  //   path: "/apps/media/all",
  //   exact: true,
  //   component: lazy(() => import("../../views/apps/media/list")),
  // },
  // {
  //   path: "/apps/media/update/:mediaId",
  //   exact: true,
  //   component: lazy(() => import("../../views/apps/media/edit")),
  // },
  {
    path: "/admin/apps/menu/all",
    exact: true,
    component: lazy(() => import("../../views/apps/menu/list")),
  },
  {
    path: "/admin/apps/menu/add",
    exact: true,
    component: lazy(() => import("../../views/apps/menu/add")),
  },
  {
    path: "/admin/apps/menu/update/:menuID",
    exact: true,
    component: lazy(() => import("../../views/apps/menu/edit")),
  },
  {
    path: "/admin/apps/permissions/add",
    exact: true,
    component: lazy(() => import("../../views/apps/permissions/add")),
  },
  {
    path: "/admin/apps/permissions/all",
    exact: true,
    component: lazy(() => import("../../views/apps/permissions/list")),
  },
  {
    path: "/admin/apps/permissions/update/:permissionID",
    exact: true,
    component: lazy(() => import("../../views/apps/permissions/edit")),
  },
  {
    path: "/admin/apps/admin-management/add",
    exact: true,
    component: lazy(() => import("../../views/apps/adminManage/add")),
  },
  {
    path: "/admin/apps/admin-management/all",
    exact: true,
    component: lazy(() => import("../../views/apps/adminManage/list")),
  },
  {
    path: "/admin/apps/admin-management/update/:manageID",
    exact: true,
    component: lazy(() => import("../../views/apps/adminManage/edit")),
  },
  {
    path: "/admin/apps/lab/all",
    exact: true,
    component: lazy(() => import("../../views/apps/lab/list")),
  },
  {
    path: "/admin/apps/lab/add",
    exact: true,
    component: lazy(() => import("../../views/apps/lab/add")),
  },
  {
    path: "/admin/apps/lab/update/:labID",
    exact: true,
    component: lazy(() => import("../../views/apps/lab/edit")),
  },
  {
    path: "/admin/apps/careers/all",
    exact: true,
    component: lazy(() => import("../../views/apps/careers/list")),
  },
  {
    path: "/admin/apps/careers/add",
    exact: true,
    component: lazy(() => import("../../views/apps/careers/add")),
  },
  {
    path: "/admin/apps/careers/update/:careersID",
    exact: true,
    component: lazy(() => import("../../views/apps/careers/edit")),
  },
  {
    path: "/admin/apps/order/all",
    exact: true,
    component: lazy(() => import("../../views/apps/order/list")),
  },
];

export default AppRoutes;
