import { Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NAV_LISTS = [
  { text: "edit profile", link: "/user/profile" },
  { text: "properties visits booked", link: "/user/visits" },
  { text: "Transactions List", link: "/user/transactions" },
  { text: "Properties purchased", link: "/user/properties" },

  { text: "Change Password", link: "/user/changePassword" },
];

const ProfileNav = () => {
  const {
    user: { user },
  } = useAuth();

  return (
    <Paper elevation={5} sx={{ p: 5 }}>
      {NAV_LISTS.map((nav, i) => {
        if (
          !(
            nav.text === NAV_LISTS[NAV_LISTS.length - 1].text &&
            user?.authType === "google"
          )
        ) {
          return (
            <NavLink to={nav.link} key={i}>
              <Typography
                variant="body1"
                fontWeight={500}
                textTransform="capitalize"
              >
                {nav.text}
              </Typography>
            </NavLink>
          );
        } else {
          return null;
        }
      })}
    </Paper>
  );
};

export default ProfileNav;
