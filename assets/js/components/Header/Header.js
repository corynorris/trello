import { h, Component } from "preact";
import { route } from "preact-router";
import TopAppBar from "preact-material-components/TopAppBar";
import "preact-material-components/TopAppBar/style.css";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";

class Header extends Component {
  constructor() {
    super();
  }

  render(props) {
    return (
      <div style={{}}>
        <TopAppBar
          style={{ background: "#4F00BB", height: "3em" }}
          class="mdc-top-app-bar mdc-top-app-bar--fixed"
        >
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Title>Boards</TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <Button href="/sign_out" style={{ color: "white" }}>
                Sign Out
                <TopAppBar.Icon>exit_to_app</TopAppBar.Icon>
              </Button>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
      </div>
    );
  }
}

export default Header;
