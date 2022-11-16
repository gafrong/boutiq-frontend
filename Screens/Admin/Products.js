import React, {useState, useCallback, useContext} from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import BoutiqButton from '../../Shared/StyledComponents/BoutiqButton';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../Context/store/AuthGlobal';

import ListItem from './ListItem';

var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View 
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:"600"}}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:"600"}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:"600"}}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:"600"}}>Price</Text>
            </View>
        </View>
    )
}

const Products = (props) => {

    const [productList, setProductList ] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const context = useContext(AuthGlobal);

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                    axios
                    .get(`${baseURL}products/admin/${context.stateUser.user.userId}`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })    

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }    
            },
            [],
        )
    )

    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => 
                [console.log("Status",error.response.status),
                console.log("Data",error.response.data.message)
            ]
            );
    }

    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <BoutiqButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white"/>
                    <Text style={styles.buttonText}>Orders</Text>
                </BoutiqButton>
                <BoutiqButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Products</Text>
                </BoutiqButton>
                <BoutiqButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="reorder" size={18} color="white"/>
                    <Text style={styles.buttonText}>Categories</Text>
                </BoutiqButton>
            </View>
            <View> 
                <TextInput  
                    label='Search'
                    onChangeText={(text) => searchProduct(text)}
                />
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>

            ) : (
                <FlatList 
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({item, index}) => (
                        <ListItem 
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Products;