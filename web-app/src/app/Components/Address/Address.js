import React from "react";
import { connect } from "react-redux";
import "./Address.scss";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchGetApi } from "../../Services/fetchUtils";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DropdownSearch from "../FormElements/DropdownSearch";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
});

/**
 * Renders the Create/View Todo Component
 */
export class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [{ label: "", value: "" }],
      states: [{ label: "", value: "" }],
      cities: [{ label: "", value: "" }],
      selectedCountry: {},
      selectedState: {},
      selectedCity: {},
    };
  }
 
  async componentDidMount() {
    const url = ROUTES_CONFIG.countries_api;
    const countries = await fetchGetApi(url);
    let countryArray = [];
    countries.map((country) => {
      countryArray.push({ label: country.name, value: country.iso2 });
    });

    this.setState({ countries: countryArray });
    //}));
    console.log(this.state);
    window.addEventListener("keydown", this.tabKeyPressed);
    window.addEventListener("mousedown", this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector("body").classList.remove("noFocus");
      window.removeEventListener("keydown", this.tabKeyPressed);
      window.addEventListener("mousedown", this.mouseClicked);
    }
  };

  mouseClicked = () => {
    document.querySelector("body").classList.add("noFocus");
    window.removeEventListener("mousedown", this.mouseClicked);
    window.addEventListener("keydown", this.tabKeyPressed);
  };

  onChangeCountry = (item, name) => {
    this.setState({ selectedCountry: item });
    this.props.setAddress("country", item);
    const url = ROUTES_CONFIG.states_api;

    console.log("URL--->", url);
    console.log("ITEM--->", item);
    fetchGetApi(url + item.value).then((states) => {
      let statesArray = [];
      states.map((state) => {
        statesArray.push({ label: state.name, value: state.iso2 });
      });
      this.setState({ states: statesArray });
    });
    window.addEventListener("keydown", this.tabKeyPressed);
    window.addEventListener("mousedown", this.mouseClicked);
  };

  onChangeState = (item, name) => {
    const url = ROUTES_CONFIG.cities_api;
    this.setState({ selectedState: item });
    this.props.setAddress("state", item);
    fetchGetApi(url + item.value + "/" + this.state.selectedCountry.value).then(
      (states) => {
        let citiesArray = [];
        states.map((state) => {
          citiesArray.push({ label: state.name, value: state.id });
        });
        this.setState({ cities: citiesArray });
      }
    );
    console.log(item, name);
  };

  onChangeCity = (item, name) => {
    this.setState({ selectedCity: item });
    this.props.setAddress("city", item);
  };

  render() {
    const { countries, states, cities } = this.state;
    return (
      <div className="addressComponent">
        <Row>
          <Col xs={2} md={2} lg={3}>
            {countries.length > 0 ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label> Country </Form.Label> */}
                <DropdownSearch
                  id="country"
                  name="location"
                  searchable={["Search for countries", "No matching countries"]}
                  title="Country"
                  list={countries}
                  onChange={this.onChangeCountry}
                />
              </Form.Group>
            ) : null}
          </Col>
          <Col> </Col>
          <Col xs={2} md={2} lg={3}>
            {states.length > 0 ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label> State </Form.Label> */}
                <DropdownSearch
                  id="state"
                  name="state"
                  searchable={["Search for states", "No matching states"]}
                  title="State"
                  list={states}
                  onChange={this.onChangeState}/>{" "}
              </Form.Group>
            ) : null}
          </Col>
          <Col> </Col>
          <Col xs={2} md={2} lg={3}>
            {cities.length > 0 ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label> City </Form.Label> */}
                <DropdownSearch
                  id="cities"
                  name="cities"
                  searchable={["Search for cities", "No matching cities"]}
                  title="City"
                  list={cities}
                  onChange={this.onChangeCity}
                />{" "}
              </Form.Group>
            ) : null}
          </Col>{" "}
          
        </Row>
      </div>
    );
  }
}

const ConnectAddress = connect(
  mapStoreToProps
)(Address);
export default Address;
