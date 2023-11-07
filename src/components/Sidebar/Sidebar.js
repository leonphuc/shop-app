import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core";
import "./Sidebar.scss";
import config from "../../router/config";

import { useGetAllCategoriesQuery } from "../../feature/productsApi";

function Sidebar() {
  const { data, isFetching } = useGetAllCategoriesQuery();

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <div className="sidebar-sort-by-category">
            <h3>
              <i className="fa-solid fa-filter"></i>&nbsp;Sort by Category
            </h3>
          </div>
          {!isFetching &&
            data.map((res, index) => (
              <NavLink
                to={config.routes.category + `${res}`}
                className="category-list-item"
                key={index}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    {/* <ListItemText primary={res} variant="h3" /> */}
                    <ListItemText>
                      <h4>
                        <i className="fa-solid fa-caret-right arrow-icon"></i>
                        {res}
                      </h4>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
        </List>
        {/* <List>
          <div className="sidebar-sort-by-price">
            <h3>
              <i class="fa-solid fa-filter"></i>&nbsp;sort by price
            </h3>
          </div>
        </List> */}
      </nav>
    </Box>
  );
}

export default Sidebar;
