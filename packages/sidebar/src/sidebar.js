import React, { Component } from 'react';

import Item from './item';
import ExpandAllButton from './button-expand-all';
import getActiveItem from './get-active-item';
import getActiveItemParents from './get-active-item-parents';
import presets, { fonts } from './presets';

// Access to global `localStorage` property must be guarded as it
// fails under iOS private session mode.
var hasLocalStorage = true;
var testKey = `gatsbyjs.sidebar.testKey`;
var ls;
try {
  ls = global.localStorage;
  ls.setItem(testKey, `test`);
  ls.removeItem(testKey);
} catch (e) {
  hasLocalStorage = false;
}

const isItemActive = (activeItemParents, item) => {
  if (activeItemParents) {
    for (let parent of activeItemParents) {
      if (parent === item.title) return true;
    }
  }

  return false;
};

const getOpenItemHash = (itemList, state) => {
  for (let item of itemList) {
    if (item.items) {
      state.openSectionHash[item.title] =
        isItemActive(state.activeItemParents, item) ||
        state.activeItemLink.title === item.title;

      getOpenItemHash(item.items, state);
    }
  }

  return false;
};

class SidebarBody extends Component {
  constructor(props, context) {
    super(props, context);

    this._toggleSection = this._toggleSection.bind(this);
    this.state = { ...this._getInitialState(props) };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    const node = this.scrollRef.current;

    if (hasLocalStorage) {
      const key = this.props.itemList[0].key;
      const initialState = this.state;
      const localState = this._readLocalStorage(key);

      if (localState) {
        const bar = Object.keys(initialState.openSectionHash).filter(function(
          key
        ) {
          return initialState.openSectionHash[key];
        });

        const state = {
          ...initialState,
          openSectionHash: JSON.parse(localState).openSectionHash,
        };

        for (let item in initialState.openSectionHash) {
          for (let parent of bar) {
            if (parent === item) {
              state.openSectionHash[item] = true;
            }
          }
        }

        state.expandAll = Object.entries(state.openSectionHash).every(
          k => k[1]
        );
        this.setState(state, () => {
          if (node && this.props.position) {
            node.scrollTop = this.props.position;
          }
        });
      } else {
        this._writeLocalStorage(this.state, key);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeItemHash !== state.activeItemHash) {
      const activeItemLink = getActiveItem(
        props.itemList,
        props.location,
        props.activeItemHash
      );

      return {
        activeItemLink: activeItemLink,
        activeItemParents: getActiveItemParents(
          props.itemList,
          activeItemLink,
          []
        ),
        activeItemHash: props.activeItemHash,
      };
    }

    return null;
  }

  _getInitialState(props) {
    const activeItemLink = getActiveItem(
      props.itemList,
      props.location,
      props.activeItemHash
    );

    const state = {
      openSectionHash: {},
      expandAll: false,
      key: props.itemList[0].key,
      activeItemHash: props.activeItemHash,
      activeItemLink: activeItemLink,
      activeItemParents: getActiveItemParents(
        props.itemList,
        activeItemLink,
        []
      ),
    };

    getOpenItemHash(props.itemList, state);
    state.expandAll = Object.entries(state.openSectionHash).every(k => k[1]);

    return state;
  }

  _readLocalStorage(key) {
    if (hasLocalStorage) {
      return localStorage.getItem(`gatsbyjs:sidebar:${key}`);
    } else {
      return false;
    }
  }

  _writeLocalStorage(state, key) {
    if (hasLocalStorage) {
      localStorage.setItem(`gatsbyjs:sidebar:${key}`, JSON.stringify(state));
    }
  }

  _toggleSection(item) {
    const { openSectionHash } = this.state;

    const state = {
      openSectionHash: {
        ...openSectionHash,
        [item.title]: !openSectionHash[item.title],
      },
    };

    state.expandAll = Object.entries(state.openSectionHash).every(k => k[1]);

    this._writeLocalStorage(state, this.state.key);
    this.setState(state);
  }

  _expandAll = () => {
    if (this.state.expandAll) {
      this._writeLocalStorage(
        { openSectionHash: this._getInitialState(this.props).openSectionHash },
        this.state.key
      );
      this.setState({
        ...this._getInitialState(this.props),
        expandAll: false,
      });
    } else {
      let openSectionHash = { ...this.state.openSectionHash };
      Object.keys(openSectionHash).forEach(k => (openSectionHash[k] = true));
      this._writeLocalStorage({ openSectionHash }, this.state.key);
      this.setState({ openSectionHash, expandAll: true });
    }
  };

  render() {
    const { closeSidebar, itemList, location, onPositionChange } = this.props;
    const { openSectionHash, activeItemLink, activeItemParents } = this.state;

    return (
      <section
        aria-label="Secondary Navigation"
        id="SecondaryNavigation"
        css={{ height: `100%` }}
      >
        <header css={{ ...styles.utils }}>
          <ExpandAllButton
            onClick={this._expandAll}
            expandAll={this.state.expandAll}
          />
        </header>
        <nav
          onScroll={({ nativeEvent }) => {
            // get proper scroll position
            const position = nativeEvent.target.scrollTop;
            const { pathname } = location;
            const sidebarType = pathname.split(`/`)[1];

            requestAnimationFrame(() => {
              onPositionChange(sidebarType, position);
            });
          }}
          ref={this.scrollRef}
          css={{
            ...styles.sidebarScrollContainer,
            height: itemList[0].disableExpandAll
              ? `100%`
              : `calc(100% - 2.5rem)`,
            [presets.Tablet]: {
              ...styles.sidebarScrollContainerTablet,
            },
          }}
        >
          <ul css={{ ...styles.list }}>
            {itemList.map((item, index) => (
              <Item
                activeItemLink={activeItemLink}
                activeItemParents={activeItemParents}
                isActive={openSectionHash[item.title]}
                item={item}
                key={index}
                level={0}
                location={location}
                onLinkClick={closeSidebar}
                onSectionTitleClick={this._toggleSection}
                openSectionHash={openSectionHash}
              />
            ))}
          </ul>
        </nav>
      </section>
    );
  }
}

export default SidebarBody;

const styles = {
  utils: {
    borderRight: `1px solid #ede7f3`,
    display: `flex`,
    alignItems: `center`,
    height: '2.5rem',
    background: '#fbfafc',
    paddingLeft: 40,
    paddingRight: 8,
    borderBottom: `1px solid #ede7f3`,
  },
  sidebarScrollContainer: {
    WebkitOverflowScrolling: `touch`,
    background: `#fff`,
    border: 0,
    display: `block`,
    overflowY: `auto`,
    transition: `opacity 0.5s ease`,
    zIndex: 10,
    borderRight: `1px solid #ede7f3`,
    '::-webkit-scrollbar': {
      height: `6px`,
      width: `6px`,
    },
    '::-webkit-scrollbar-thumb': {
      background: '#e0d6eb',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#8c65b3',
    },
    '::-webkit-scrollbar-track': {
      background: '#f5f3f7',
    },
  },
  sidebarScrollContainerTablet: {
    backgroundColor: '#fbfafc',
    top: `calc(${presets.headerHeight} + ${presets.bannerHeight})`,
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    paddingTop: 20,
    paddingBottom: 104,
    fontSize: 16,
    '& a': {
      fontFamily: fonts.system.join(`,`),
    },
    '& li': {
      margin: 0,
      listStyle: `none`,
    },
    '& > li:last-child > span:before': {
      display: `none`,
    },
  },
};
