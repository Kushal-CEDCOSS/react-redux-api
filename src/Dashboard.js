import {
  TopBar,
  ActionList,
  Icon,
  VisuallyHidden,
  Frame,
} from "@shopify/polaris";
import { loadCredentials, saveCredentials } from "./Actions";

import { ArrowLeftMinor, QuestionMarkMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect, useRef } from "react";
import store from "./Store";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anything, setAnything] = useState(false);
  const switchPage = useNavigate();

  
  useEffect(() => {
    var oldData = JSON.parse(sessionStorage.getItem("currentUser"));
      if (oldData !== null) {
        store.dispatch(loadCredentials(oldData));
        setAnything(!anything);
      } else {
        switchPage("/");
      }
  },[]);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );


  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "Logout",
              icon: ArrowLeftMinor,
              onAction: () => {
                sessionStorage.removeItem("currentUser");
                switchPage("/");
                saveCredentials({ customerName: "", token: "", username: "" });
              },
            },
          ],
        },
      ]}
      name={store.getState().customername}
      detail={store.getState().username}
      initials={store.getState().customername.charAt(0).toUpperCase()}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionMarkMajor} />
          <VisuallyHidden>Secondary menu</VisuallyHidden>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{ content: "Community forums" }],
        },
      ]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div style={{ height: "250px" }}>
      <Frame topBar={topBarMarkup} />
    </div>
  );
}

export default Dashboard;
