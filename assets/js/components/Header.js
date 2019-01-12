import { h, Component } from "preact";
import { route } from "preact-router";
import TopAppBar from "preact-material-components/TopAppBar";
import "preact-material-components/TopAppBar/style.css";
// import style from './style';
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
        <TopAppBar className="topappbar">
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Title>Boards</TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <Button href="/sign_out" style={{ color: "white" }}>
                Sign Out
              </Button>
              {/* <TopAppBar.Icon>settings</TopAppBar.Icon> */}
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
      </div>
    );
  }
}

export default Header;
