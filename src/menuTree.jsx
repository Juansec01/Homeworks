// src/menuTree.js
const menuTree = {
  title: "Root",
  children: [
    {
      title: "Profile",
      link: "/profile",
      component: "ProfilePage",
    },
    {
      title: "Messages",
      link: "/messages",
      component: "MessagesPage",
    },
    {
      title: "Settings",
      children: [
        { title: "Account", link: "/settings/account", component: "AccountPage" },
        { title: "Profile", link: "/settings/profile", component: "SettingsProfilePage" },
        { title: "Security & Privacy", link: "/settings/security", component: "SecurityPage" },
        { title: "Password", link: "/settings/password", component: "PasswordPage" },
        { title: "Notification", link: "/settings/notification", component: "NotificationPage" },
      ],
    },
    {
      title: "Help",
      children: [
        { title: "FAQ's", link: "/help/faqs", component: "FaqPage" },
        { title: "Submit a Ticket", link: "/help/ticket", component: "TicketPage" },
        { title: "Network Status", link: "/help/status", component: "StatusPage" },
      ],
    },
    {
      title: "Logout",
      link: "/logout",
      component: "LogoutPage",
    },
  ],
};

export default menuTree;
