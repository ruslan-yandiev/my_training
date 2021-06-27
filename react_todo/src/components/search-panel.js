import React from 'react';

function SearchPanel() {
    const searchStyle = {
        fontSize: '25px',
        color: 'red',
    };
    const searchText = 'search 1';
    return <input placeholder={searchText} style={searchStyle} />;
    // return <input placeholder="search" />;
}

export default SearchPanel;
