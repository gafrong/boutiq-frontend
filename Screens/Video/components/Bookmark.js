import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';

const Bookmark = (props) => {
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);

    const variable = {
        userId: props.userId,
        videoId: props.videoId
    }
    const token = props.token;

    useEffect(() => {
        
        axios.post(`${baseURL}bookmarks/getBookmarkCount`, variable, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` },
        })
            .then(response => {
                if(response.data.success) {
                    setBookmarkCount(response.data.bookmarkCount)
                } else {
                    alert('Failed to get bookmark count')
                }
            });

        axios.post(`${baseURL}bookmarks/bookmarked`, variable, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` },
        })
            .then(response => {
                if(response.data.success) {
                    setBookmarked(response.data.bookmarked)
                } else {
                    alert('Failed to load bookmark info')
                }
            })
    }, [variable])


    const handleBookmark = () => {
        if(bookmarked) {
            axios.post(`${baseURL}bookmarks/removeFromBookmark`, variable, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then(response => {
                if(response.data.success) {
                    setBookmarkCount(bookmarked - 1)
                    setBookmarked(!bookmarked)
                } else {
                    alert('Failed to remove from bookmark')
                }
            })
        } else {
            axios.post(`${baseURL}bookmarks/addToBookmark`, variable, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then(response => {
                if(response.data.success) {
                    setBookmarkCount(bookmarked + 1)
                    setBookmarked(!bookmarked)
                } else {
                    alert('Failed to add to bookmark')
                }
            })
            .catch((error) => alert("로그인해주세요."))  
        }
    }

	return (
        <> 
            {bookmarked ? 
                <TouchableOpacity onPress={()=> handleBookmark()}>
                    <View style={styles.menu}>
                        <Icon
                            size={28}
                            name="bookmark"
                            color={"tomato"}
                        />
                        <Text style={styles.bookmarkCount}>{bookmarkCount}</Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> handleBookmark()}>
                    <View style={styles.menu}>
                        <Icon
                            size={28}
                            name="bookmark-outline"
                            color={"#ffffff"}
                        />
                        <Text style={styles.bookmarkCount}>{bookmarkCount}</Text>
                    </View>
                </TouchableOpacity>
            }
        </>
	)
}

const styles = StyleSheet.create({
    menu:{
        marginTop: 6,
        marginBottom: 6,
        alignItems: "center",
    },
    count: {
        color: "#fff",
        fontSize: 12,
    },
    bookmarkCount: {
        color: '#fff'
    }
})
export default Bookmark