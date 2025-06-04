import {
  UserCheck,
  Users,
  Menu,
  Settings,
  Copy,
  HelpCircle,
  Map,
  Activity,
  Clock,
  Thermometer,
  Sliders,
  Bell,
  BookOpen,
  Book,
  PhoneIncoming,
} from "react-feather";

export default [
  {
    id: "UserManagement",
    title: "User Management",
    icon: <Users size={20} />,
    navLink: "/apps/user/all",
  },
  {
    id: "CategoryManagement",
    title: "Category Management",
    icon: <Sliders size={20} />,
    navLink: "/apps/category/all",
  },
  {
    id: "TestManagement",
    title: "Test Management",
    icon: <Thermometer size={20} />,
    navLink: "/apps/test/all",
  },
  {
    id: "CouponManagement",
    title: "Coupon Management",
    icon: <Copy size={20} />,
    navLink: "/apps/coupon/all",
  },
  {
    id: "InquiryManagement",
    title: "Inquiry Management",
    icon: <HelpCircle size={20} />,
    navLink: "/apps/inquiry/all",
  },
  {
    id: "FeddBackManagement",
    title: "FeedBack",
    icon: <HelpCircle size={20} />,
    navLink: "/apps/feedback/all",
  },
  // {
  //   id: "BannerManagement",
  //   title: "Banner Management",
  //   icon: <Map size={20} />,
  //   navLink: "/apps/banner/all",
  // },
  {
    id: "HealthRiskManagement",
    title: "Health Risk Management",
    icon: <Activity size={20} />,
    navLink: "/apps/risk/all",
  },
  {
    id: "HabitManagement",
    title: "Habit Management",
    icon: <Clock size={20} />,
    navLink: "/apps/habit/all",
  },

  // {
  //   id: "MediaManagement",
  //   title: "Media Management",
  //   icon: <Aperture size={20} />,
  //   navLink: "/apps/media/all",
  // },
  // {
  //   id: "SettingManagement",
  //   title: "Setting Management",
  //   icon: <Settings size={20} />,
  //   navLink: "/apps/setting",
  // },
  {
    id: "MenuManagement",
    title: "Menu Management",
    icon: <Menu size={20} />,
    navLink: "/admin/apps/menu/all",
  },

  // {
  //   id: "PermissionManagement",
  //   title: "Role Management",
  //   icon: <UserCheck size={20} />,
  //   navLink: "/admin/apps/permissions/all",
  // },
  {
    id: "AdminManagement",
    title: "Admin Management",
    icon: <Users size={20} />,
    navLink: "/admin/apps/admin-management/all",
  },
  {
    id: "LabManagement",
    title: "Lab Management",
    icon: <Users size={20} />,
    navLink: "/admin/apps/lab/all",
  },
  {
    id: "CareersManagement",
    title: "Careers Managment",
    icon: <Users size={20} />,
    navLink: "/admin/apps/careers/all",
  },
  {
    id: "OrderManagement",
    title: "Order Management",
    icon: <Users size={20} />,
    navLink: "/admin/apps/order/all",
  },
  // {
  //   id: "LandingPage",
  //   title: "Landing Page",
  //   icon: <Clock size={20} />,
  //   navLink: "/apps/landing-page/all",
  // },

  {
    id: "OurTeamPage",
    title: "Our Team",
    icon: <Clock size={20} />,
    navLink: "/apps/our-team/all",
  },
  {
    id: "BioWasteManagement",
    title: "Bio Waste Management",
    icon: <Bell size={20} />,
    navLink: "/apps/bio-waste/all",
  },
  {
    id: "AppointmentManagement",
    title: "Appointment Management",
    icon: <BookOpen size={20} />,
    navLink: "/apps/appointment/all",
  },
  {
    id: "contactPage",
    title: "Contact Us",
    icon: <PhoneIncoming size={20} />,
    navLink: "/apps/contact-us/all",
  },
  {
    id: "corporateHealthEnquiry",
    title: "Corporate Health Enquiry",
    icon: <HelpCircle size={20} />,
    navLink: "/apps/corporate-health-enquiry/all",
  },
  {
    id: "PrescriptionPage",
    title: "Prescription Page",
    icon: <Book size={20} />,
    navLink: "/apps/prescription-page/all",
  },
  {
    id: "appliedJob",
    title: "Applied Job",
    icon: <Book size={20} />,
    navLink: "/apps/applie-job/all",
  },
  {
    id: "franchises",
    title: "Franchises",
    icon: <Book size={20} />,
    navLink: "/apps/franchises/all",
  },
  {
    id: "SubscriberPage",
    title: "Subscriber Page",
    icon: <Bell size={20} />,
    navLink: "/apps/subscriber-page/all",
  },
  {
    id: "NotificationManagement",
    title: "Notifications",
    icon: <Bell size={20} />,
    navLink: "/apps/notification/all"
  },
  {
    id: "NotificationCategoryManagement",
    title: "Notification Categories",
    icon: <Bell size={20} />,
    navLink: "/apps/notificationCategory/list"
  },
];
