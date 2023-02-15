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
  currentAddress: state.currentAddress,
});

/**
 * Renders the Create/View Todo Component
 */
export class AddressWithStreet extends React.Component {
  constructor(props) {
    super(props);
    let currentAddress="", currentState={}, currentCity={}, currentZip=undefined, currentCountry={};
    console.log("props",this.props);
    if(this.props.address){
      currentAddress= this.address.street ? this.address.street : "";
      currentCountry = this.address.country ? this.address.country : {};
      currentState = this.address.state ? this.address.state : {};
      currentZip = this.address.zipcode ? this.address.zipcode : "";
      currentCity=this.address.city ? this.address.city : {};
    }
    this.state = {
      countries: [{label:"", value:""}],
      states:[{label:"", value:""}],
      cities:[{label:"", value:""}],
      selectedCountry:currentCountry, selectedState:currentState, selectedCity:currentCity, street:currentAddress, 
      zipcode:currentZip
    };
  }

  async componentDidMount() {
    const url = ROUTES_CONFIG.countries_api;
    const countries = await fetchGetApi(url);
    let countryArray =[];
      countries.map((country)=>{
        countryArray.push({label:country.name, value:country.iso2});
      })
     
    this.setState({countries:countryArray});
    window.addEventListener('keydown', this.tabKeyPressed);
    window.addEventListener('mousedown', this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus');
      window.removeEventListener('keydown', this.tabKeyPressed);
      window.addEventListener('mousedown', this.mouseClicked);
    }
  }

  mouseClicked = () => {
    document.querySelector('body').classList.add('noFocus');
    window.removeEventListener('mousedown', this.mouseClicked);
    window.addEventListener('keydown', this.tabKeyPressed);
  }

  onChangeCountry = (item, name) => {
    this.setState({selectedCountry:item});
    const url = ROUTES_CONFIG.states_api;
    this.props.setAddress("country", item);
    fetchGetApi(url+item.value).then((states) =>{
      let statesArray =[];
      states.map((state)=>{
        statesArray.push({label:state.name, value:state.iso2});
      })
      this.setState({states:statesArray});
    });
    window.addEventListener('keydown', this.tabKeyPressed);
    window.addEventListener('mousedown', this.mouseClicked);
  }

  onChangeState = (item, name) => {
    const url = ROUTES_CONFIG.cities_api;
    this.setState({selectedState:item});
    this.props.setAddress("state", item);
    fetchGetApi(url+item.value+"/"+this.state.selectedCountry.value).then((states) =>{
      let citiesArray =[];
      states.map((state)=>{
        citiesArray.push({label:state.name, value:state.id+""});
      })
      this.setState({cities:citiesArray});
    });
    console.log(item, name);
 }

 onChangeCity = (item, name) => {
  this.props.setAddress("city", item);
  this.setState({selectedCity:item});
}

 /**
   * handles the address changes
   * @param {*} value
   */
  handleOnAddressChange = (value) => {
      
    this.setState({street:value});
    console.log(this.state);
  };

   /**
   * handles the zipcode changes
   * @param {*} value
   */
    handleOnZipcodeChange = (value) => {
        
        if(this.state && this.state.zipcode && this.state.zipcode.length<=4){
          this.setState({zipcode:value});
        }
      };

  render() {
    const { countries, states, cities } = this.state;
    return (
        <div className="addressComponentStreet">
          <Row>
          <Col xs={10} md={6} lg={8}>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              {/* <Form.Label>Address/Street</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Address (ex: Street 434)"
                value={this.state.street}
                onChange={(event) =>
                  this.handleOnAddressChange(event.target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col xs={2} md={2} lg={4}><Form.Group className="mb-3" controlId="formBasicZip">
              {/* <Form.Label>Zipcode</Form.Label> */}
              <Form.Control
                type="number"
                pattern="\d*" 
                max="99999"
                placeholder="Enter Zipcode (ex:12345)"
                value={this.state.zipcode}
                onChange={(event) =>
                  this.handleOnZipcodeChange(event.target.value)
                }
              />
            </Form.Group></Col>
          <Col></Col>
        </Row>
          <Row>
          <Col xs md lg={2}></Col>
         
          <Col xs={12} md={6} lg={3}>
          
          {countries.length > 0 ? <Form.Group  className="mb-3" controlId="formBasicCountry">
              {/* <Form.Label>Country</Form.Label>  */}
              <DropdownSearch
            name="location"
            searchable={['Search for countries', 'No matching countries']}
            title="Country"
            list={countries}
            onChange={this.onChangeCountry}
          /> </Form.Group>:null}
          
          </Col>
          <Col xs={12} md={6} lg={3}>
          
          {states.length > 0 ?
          <Form.Group className="mb-3" controlId="formBasicState">
          {/* <Form.Label>State</Form.Label> */}
           <DropdownSearch
            name="state"
            searchable={['Search for states', 'No matching states']}
            title="State"
            list={states}
            onChange={this.onChangeState}
          />  </Form.Group> :null}
         
          </Col>
          <Col xs={12} md={6} lg={3}>
          
          {cities.length > 0 ? 
          <Form.Group className="mb-3" controlId="formBasicCity">
          {/* <Form.Label>City</Form.Label> */}
          <DropdownSearch
            name="cities"
            searchable={['Search for cities', 'No matching cities']}
            title="City"
            list={cities}
            onChange={this.onChangeCity}
          />    </Form.Group> :null}
       
          </Col>
         
          </Row>
      </div>
    );
  }
}

const ConnectAddress = connect(
  mapStoreToProps
)(AddressWithStreet);
export default AddressWithStreet;
