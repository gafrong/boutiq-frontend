import React, {useState, useEffect} from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, Text } from 'react-native';

import ProductList from './ProductList'

const data = require('../../assets/data/product.json')

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([])
        }
    }, [])

    return(
            <View>
                <Text>Hello</Text>
                <View style={{marginTop: 10}}>
                    <FlatList
                        numColumns={2}
                        data={products}
                        renderItem={({item}) => 
                        <ProductList
                            navigation={props.navigation}
                            key={item._id}
                            item={item}
                        />}
                        keyExtractor={item => item.name}
                    />
                </View>
                
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: height,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default ProductContainer;