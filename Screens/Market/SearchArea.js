import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper'

const SearchArea = () => {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="상품이나 스토어를 검색하세요"
        onChangeText={onChangeSearch}
        value={searchQuery}
        iconColor='#ffffff'
        style={styles.searchArea}
        inputStyle={styles.inputArea}
        placeholderTextColor="#ccc"
      />
    );
}

const styles = StyleSheet.create({
    searchArea:{
        backgroundColor: '#353535',
        color: '#ffffff',
        margin: 8,
        marginBottom:0,
        padding: 0,
        height: 35
    },
    inputArea: {
        color: '#ffffff',
        fontSize: 13,
    }
})
export default SearchArea;