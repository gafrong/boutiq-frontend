import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import React, {useState} from 'react'
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

var { height, width } = Dimensions.get("window")

const SearchArea = () => {

    const navigation = useNavigation();
    const [currentView, setCurrentView] = useState(0);
    const views = [
        <View key="1" style={styles.page}>
            <Text style={styles.text}>View 1</Text>
        </View>,
        <View key="2"  style={styles.page}>
            <Text style={styles.text}>View 2</Text>
        </View>,
        <View key="3" style={styles.page}>
             <Text style={styles.text}>View 3</Text>
        </View>
    ];
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                 <TouchableOpacity 
                    onPress={()=> navigation.navigate('Homee')}
                    style={styles.back}>
                    <Icon 
                        name="chevron-left"
                        style={styles.searchIcon}
                        color={'#fff'}
                         size={36}
                     />
                 </TouchableOpacity>    
             </View>
             <Text style={styles.text}>SearchArea</Text>
            
            <View style={{flexDirection:'row'}}>
                {views.map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        setCurrentView(index);
                    }}>
                        <Text style={styles.pageBtn}>View {index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={views}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => item}
                horizontal={true}
                contentContainerStyle={{flexDirection: 'row'}}
                initialScrollIndex={currentView}
                pagingEnabled={true}
                onScrollToIndexFailed={(error) => {
                    if (error.highestMeasuredFrameIndex != null) {
                      setCurrentView(error.highestMeasuredFrameIndex);
                    }
                  }}
                ref={(ref) => {
                    if(ref) {
                        ref.scrollToIndex({
                            index: currentView,
                            animated: true,
                        });
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: '#000',
        padding: 0,
        width: width,
        height: height / 2,
    },
    container: {
        flex:1,
        backgroundColor: '#000',
        padding: 0
    },
    text: {
        color: '#fff'
    },
    headerContainer:{
        height: 65,
        paddingLeft: 15,
        padding: 0,
        paddingTop: 20,
        backgroundColor: '#000',
        flexDirection: 'row'
    },
    back : {
        color: '#fff',
        position: 'absolute',
        left: 0,
        top: 25
    },
    pageBtn: {
        color: '#fff',
        width: 100,
        height: 100,
        backgroundColor: 'orange'
    }
})


export default SearchArea
