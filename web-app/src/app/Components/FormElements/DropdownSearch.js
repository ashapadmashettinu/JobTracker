import React from "react";
import { connect } from "react-redux";
import "./DropdownSearch.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp as ArrowUp, faCaretDown as ArrowDown, faCheck as Check} from '@fortawesome/free-solid-svg-icons'

/**
 * Renders the Create/View Todo Component
 */
export class DropdownSearch extends React.Component {
    constructor(props) {
        super(props);
        const { title } = this.props;
        this.state = {
          isListOpen: false,
          title:title,
          selectedItem: null,
          keyword: '',
          list:[],
        };
    
        this.searchField = React.createRef();
      }
      componentDidMount() {
        const { title, list } = this.props;
        this.setState((prevState)=>{
          Object.assign({}, prevState, {list})
        })
        const { select } = this.props;
        
    
        if (select) {
          this.selectSingleItem(select);
        }
      }
    
      componentDidUpdate() {
        const { isListOpen } = this.state;
    
        setTimeout(() => {
          if (isListOpen) {
            window.addEventListener('click', this.close);
          } else {
            window.removeEventListener('click', this.close);
          }
        }, 0);
      }
    
      componentWillUnmount() {
        window.removeEventListener('click', this.close);
      }
    
      static getDerivedStateFromProps(nextProps, prevState) {
        const { list } = nextProps;
    
        if (JSON.stringify(list) !== JSON.stringify(prevState.list)) {
          return { list };
        }
    
        return null;
      }
    
      close = () => {
        this.setState({
          isListOpen: false,
        });
      }
    
      clearSelection = () => {
        const { name, title, onChange } = this.props;
    
        this.setState({
          selectedItem: null,
          title,
        }, () => {
          onChange(null, name);
        });
      }
    
      selectSingleItem = (item) => {
        const { list } = this.props;
    
        const selectedItem = list.find((i) => i.value === item.value);
        this.selectItem(selectedItem);
      }
    
      selectItem = (item) => {
        const { label, value } = item;
        const { list, selectedItem } = this.state;
        const { name, onChange } = this.props;
    
        let foundItem;
    
        if (!label) {
          foundItem = list.find((i) => i.value === item.value);
        }
    
        this.setState({
          title: label || foundItem.label,
          isListOpen: false,
          selectedItem: item,
        }, () => selectedItem?.value !== value && onChange(item, name));
      }
    
      toggleList = () => {
        this.setState((prevState) => ({
          isListOpen: !prevState.isListOpen,
          keyword: '',
        }), () => {
          if (this.state.isListOpen && this.searchField.current) {
            this.searchField.current.focus();
            this.setState({
              keyword: '',
            });
          }
        });
      }
    
      filterList = (e) => {
        this.setState({
          keyword: e.target.value.toLowerCase(),
        });
      }
    
      listItems = () => {
        const {
          id,
          searchable,
          checkIcon,
          styles,
        } = this.props;
        const { listItem, listItemNoResult } = styles;
        const { keyword, list } = this.state;
        let tempList = list.length ===0 ? [] : [...list];
        const selectedItemValue = this.state.selectedItem?.value;
    
        if (keyword.length) {
          tempList = list.filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()));
        }
    
        if (tempList.length) {
          return (
            tempList.map((item) => (
              <button
                type="button"
                className={`dds-list-item ${id}`}
                style={listItem}
                key={item.value}
                onClick={() => this.selectItem(item)}
              >
                {item.label}
                {' '}
                {item.value === selectedItemValue && (
                  <span style={styles.checkIcon}>
                    {checkIcon || <FontAwesomeIcon icon={Check} className="viewIcon"/>}
                  </span>
                )}
              </button>
            ))
          );
        }
    
        return (
          <div
            className={`dds-list-item no-result ${id}`}
            style={listItemNoResult}
          >
            {searchable[1]}
          </div>
        );
      }
    
      render() {
        const {
          id,
          searchable,
          arrowUpIcon,
          arrowDownIcon,
          styles,
        } = this.props;
        const { isListOpen, title } = this.state;
    
        const {
          wrapper,
          header,
          headerTitle,
          headerArrowUpIcon,
          headerArrowDownIcon,
          list,
          listSearchBar,
          scrollList,
        } = styles;
    
        return (
          <div
            className={`dds-wrapper ${id}`}
            style={wrapper}
          >
            <button
              type="button"
              className={`dds-header ${id}`}
              style={header}
              onClick={this.toggleList}
            >
              <div
                className={`dds-header-title ${id}`}
                style={headerTitle}
              >
                {title}
              </div>
              {isListOpen
                ? <span style={headerArrowUpIcon}>{arrowUpIcon || <FontAwesomeIcon icon={ArrowUp} className="viewIcon"/>}</span>
                : <span style={headerArrowDownIcon}>{arrowDownIcon || <FontAwesomeIcon icon={ArrowDown} className="viewIcon"/>}</span>}
            </button>
            {isListOpen && (
              <div
                className={`dds-list${searchable ? ' searchable' : ''} ${id}`}
                style={list}
              >
                {searchable
                && (
                <input
                  ref={this.searchField}
                  className={`dds-list-search-bar ${id}`}
                  style={listSearchBar}
                  placeholder={searchable[0]}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => this.filterList(e)}
                />
                )}
                <div
                  className={`dds-scroll-list ${id}`}
                  style={scrollList}
                >
                  {this.listItems()}
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    
    DropdownSearch.defaultProps = {
      id: '',
      select: undefined,
      searchable: undefined,
      styles: {},
      arrowUpIcon: null,
      arrowDownIcon: null,
      checkIcon: null,
    };
    
    DropdownSearch.propTypes = {
      id: PropTypes.string,
      styles: PropTypes.shape({
        wrapper: PropTypes.string,
        header: PropTypes.string,
        headerTitle: PropTypes.string,
        headerArrowUpIcon: PropTypes.string,
        headerArrowDownIcon: PropTypes.string,
        checkIcon: PropTypes.string,
        list: PropTypes.string,
        listSearchBar: PropTypes.string,
        scrollList: PropTypes.string,
        listItem: PropTypes.string,
        listItemNoResult: PropTypes.string,
      }),
      title: PropTypes.string.isRequired,
      list: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })).isRequired,
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      select: PropTypes.shape({ value: PropTypes.string }),
      searchable: PropTypes.shape([PropTypes.string, PropTypes.string]),
      checkIcon: PropTypes.elementType,
      arrowUpIcon: PropTypes.elementType,
      arrowDownIcon: PropTypes.elementType,
    };
    
    export default DropdownSearch;