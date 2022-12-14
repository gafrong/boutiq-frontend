import React, {useContext, useEffect, useState, useRef, useCallback, useMemo }  from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions, TextInput, FlatList, Share, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import { Avatar } from 'react-native-paper';
import Moment from 'react-moment';
import 'moment/locale/ko';
import Bookmark from './Bookmark';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseUrl';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setVideoProducts } from '../../../Redux/Reducers/productSlice';
import { setVendor } from '../../../Redux/Reducers/vendorSlice';

var { width } = Dimensions.get('window');

const Sidebar = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;
    const videoProps = props.videoProps;
    const [video, setVideo] = useState(videoProps);
    const [token, setToken] = useState();
    const [userImg, setUserImg] = useState("");

    const user = context.stateUser.user;
    const vendor = videoProps.createdBy;
    const videoId = video.id;
    const videoLikes = video.likes;
    const loggedInUserId = context.stateUser.user.userId;
    const isLiked = Boolean(videoLikes[loggedInUserId]);
    const likeCount = Object.keys(videoLikes).length;

    const dispatch = useDispatch();

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log('Token error'));
    }, [])

    useEffect(() => {
        if (context.stateUser.userProfile) {
            return setUserImg(context.stateUser.userProfile.image)
        }
    }, [context])

    const patchVideoLike = async () => {
        const response = await fetch(`${baseURL}videos/${videoId}/like`, {
            method: "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId}),
        })
        const updatedVideo = await response.json();
        setVideo(updatedVideo);
    };

    // BottomSheet for Comments
    const [isOpen, setIsOpen] = useState(false)
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["90%"], []);
    const snapBlank = useMemo(() => ["30%"], []);
    const [commentArea, setCommentArea] = useState(false);
    const [commentText, setCommentText] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [commentSize, setCommentSize] = useState(video.numComments);
    const inputRef = useRef();

    // callbacks
    const handleSheetChange = useCallback((index) => {
        // console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
        Keyboard.dismiss();
    }, []);

    const updateComment = (newComment) => {
        setCommentList(newComment.concat(commentList));  
    }
    
    const handleCommentSend = () => {
        const variables = {
            content: commentText,
            writer: loggedInUserId,
            postId: videoId
        }

        axios.post(`${baseURL}videocomments/saveComment`, variables, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(response => {
            if(response.data.success) {
                inputRef.current.clear();
                updateComment(response.data.result);
            } else {
                alert('?????? ???????????? ???????????? ???????????????.')
            }
        });

        const commentNum = {numComments: commentSize + 1};
        axios.put(`${baseURL}videos/${videoId}/updatecomments`, commentNum, {
            headers: { 'Authorization': `Bearer ${token}`}
        })
        .then(response => {
            if(response.data) {
                setCommentSize(commentSize + 1);
            } else {
                alert("Video comments not showing...")
            }
        }) 
    }

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(30);

    const getVideoComments = () => {
        const conditions = {
            skip: skip,
            limit: limit
        }
        axios.post(`${baseURL}videocomments/${videoId}`, conditions, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {         
            if(response.data) {
                setCommentList([...commentList].concat(response.data));
                setSkip(20 + skip);
            } else {
                alert("Video comments not loading...")
            }
        })  
        .catch((err) => {
            console.log(err)
        })   
    }

    const handleLoadMore = () => { 
        getVideoComments()
    }

    const renderItem = ({item, index}) => {
        return(
            <View style={styles.commentBox} key={index}>
                <Avatar.Image size={30} source={{url: item.writer.image}} style={styles.avatarImg}/>
                <View style={styles.commentDetails}>
                    <Text style={styles.writer}>{item.writer.username}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                    <Moment element={Text} fromNow style={styles.date}>{item.createdAt}</Moment>
                </View>
            </View>
        )
    }

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: video.description,
                url: video.videoUrl,
                title: video.name,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
      };
    

	return (
        <>  
            <Portal>
                {userAuthenticated
                ?   
                    <BottomSheetModal
                        detached
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        onChange={handleSheetChange}
                        enablePanDownToClose={true}
                        index={-1}
                        backgroundStyle={{backgroundColor:"#222"}}
                        handleIndicatorStyle={{backgroundColor:"#fff"}}
                    >   
                        <TouchableOpacity onPress={() => {handleClosePress(); setIsOpen(false);}} style={{zIndex: 1}}>
                            <Icon 
                                name="close" 
                                size={20} 
                                color={'#fff'}
                                style={styles.closeBtn}
                            />
                        </TouchableOpacity>
                        <View style={styles.commentArea}>   
                            <Text style={styles.totalCmts}>Total comments: {commentSize +1}</Text>  
                                <FlatList 
                                    data={commentList}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReached={handleLoadMore}
                                />        
                            {commentArea
                            ?   <View style={styles.inputArea}>
                                    <Avatar.Image 
                                        size={35} 
                                        source={{url: userImg? userImg : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg"}} 
                                        style={styles.commentorImg} />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setCommentText}
                                        ref={inputRef}
                                        placeholder="Add comment.."
                                        placeholderTextColor="#777"
                                        selectionColor={"tomato"}
                                        maxLength={140}
                                        autoFocus={false}
                                        blurOnSubmit={true}
                                        clearButtonMode="always"
                                    />
                                    <TouchableOpacity onPress={() => handleCommentSend()} style={styles.submitIcon}>
                                        <Icon
                                            name="arrow-up-circle"
                                            size={28}
                                            color={'tomato'}
                                            
                                        />
                                    </TouchableOpacity>
                                </View>
                            :   <View></View>
                            }
                            
                        </View>             
                    </BottomSheetModal>
                :   <BottomSheetModal
                        detached
                        ref={sheetRef}
                        snapPoints={snapBlank}
                        onChange={handleSheetChange}
                        enablePanDownToClose={true}
                        index={-1}
                        backgroundStyle={{backgroundColor:"#222"}}
                        handleIndicatorStyle={{backgroundColor:"#fff"}}
                    ></BottomSheetModal>
                }
                
            </Portal>
            <PortalHost name="video_comment_host" />
            <Container>
                <TouchableOpacity 
                    onPress={() => [
                        dispatch(setVideoProducts({videoProducts:videoProps.videoItems})),
                        dispatch(setVendor(vendor)),
                        navigation.navigate('Store', {seller:vendor, token:token, user:user})
                    ]}>
                    <Menu>
                        <User>
                            <ThumbImg resizeMode='cover' source={{uri: props.avatar}}/>
                        </User>
                    </Menu>
                </TouchableOpacity>
                {userAuthenticated 
                ? <TouchableOpacity onPress={()=> patchVideoLike()}>
                    <Menu>
                        {isLiked 
                        ? <Icon 
                            name="cards-heart" 
                            size={28} 
                            color={'tomato'}/>
                        : <Icon 
                            name="cards-heart-outline" 
                            size={28} 
                            color={"#ffffff"}/> }
                        <Count>{likeCount}</Count>
                    </Menu>
                </TouchableOpacity>
                : <TouchableOpacity onPress={()=> alert('Please login')}>
                    <Menu>
                        <Icon 
                            name="heart" 
                            size={25} 
                            color={"#ffffff"}/>
                        <Count>{likeCount}</Count>
                    </Menu>
                </TouchableOpacity>
                }
                {token
                ? <Bookmark videoId={videoId} userId={loggedInUserId} token={token}/>
                : <Bookmark videoId={videoId} userId={loggedInUserId} />}
                {userAuthenticated
                ?   
                    <TouchableOpacity onPress={()=> {handleSnapPress(0); setIsOpen(true);getVideoComments(); setCommentArea(true);}}>
                        <Menu>
                            <Icon
                                size={25}
                                name="comment-outline"
                                color={"#ffffff"}
                            />
                            <Count>{commentSize +1}</Count>
                        </Menu>
                    </TouchableOpacity>
                :   
                    <TouchableOpacity onPress={() => alert("Please login")}>
                        <Menu>
                            <Icon
                                size={25}
                                name="comment-outline"
                                color={"#ffffff"}
                            />
                            <Count>{commentSize +1}</Count>
                        </Menu>
                    </TouchableOpacity>
                }
                
                <TouchableOpacity onPress={()=>handleShare()}>
                    <Menu>
                        <Icon 
                            size={26} 
                            name="share" 
                            color={"#ffffff"}/>
                        <Count></Count>
                    </Menu>
                </TouchableOpacity>
            </Container>
        </>
	)
}


const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
    right: 10px;
    position: absolute;
    z-index:1;
`
const Menu = styled.View`
	margin: 6px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const ThumbImg = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 48px;
	border-width: 2px;
	border-color: #ffffff;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
`
const styles = StyleSheet.create({
    closeBtn:{
        position: 'absolute',
        right: 10,
        top: 0,
        width: 20,
        height: 40,
    },
    commentArea:{
        flex: 1, 
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5
    },
    commentBox: {
        padding: 8,
        flexDirection: 'row',
    },
    commentDetails: {
        paddingLeft: 15,
        paddingRight: 35,
        
    },  
    avatarImg: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    writer:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12
    },
    content:{
        color: '#fff',
        paddingTop: 3,
        lineHeight: 18
    },
    date: {
        color: '#fff',
        paddingTop: 5,
        fontSize:11,
    },
    totalCmts: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        paddingBottom: 10,
        paddingLeft: 8
    },
    white: {
        color: '#fff'
    },
    inputArea:{
        color: '#000',
        backgroundColor: '#444',
        height: 65,
        position: 'absolute',
        bottom:0, 
        width: width,
        padding: 10,
    },
    input: {
        color: '#000',
        backgroundColor: '#eee',
        height: 45,
        position: 'absolute',
        paddingLeft: 15,
        paddingRight: 15,
        bottom: 10,
        width: width -80,
        right: 10,
        borderRadius: 5,
    },
    commentorImg: {
        marginTop: 6,
        marginLeft: 7
    },
    submitIcon: {
        right: 15,
        top: 18,
        position: 'absolute'
    }
})
export default Sidebar;