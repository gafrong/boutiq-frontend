import React, {useContext} from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseUrl';
import axios from 'axios';

const Header = (props) => {
	const navigation = useNavigation();
	const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;

	return (
		<Container>
			{userAuthenticated ?
				<TouchableOpacity onPress={()=> navigation.navigate('BookmarkedVideos', {user:context.stateUser.user.userId})} style={styles.bookmark}>
                	<Icon
						size={28}
						name="bookmark-outline"
						color={"#fff"}
					/>
           		</TouchableOpacity>
			: null
			}
			
            <TouchableOpacity onPress={()=>alert('api call to fetch video data')}>
                <Menu>Popular</Menu>
            </TouchableOpacity>
			
			<Separator />
			<Menu bold='true'>Following</Menu>
		</Container>
	)
}
const styles = StyleSheet.create({
    bookmark:{
		position: 'absolute',
		left: 15,
		top: 8
    }
})

const Container = styled.View`
	top: 22px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	position: absolute;
	z-index: 1;
`
const Menu = styled.Text`
	color: #fff;
	letter-spacing: 0.8px;
	margin: 11px 12px;
	font-weight: ${props => (props.bold ? 'bold' : 'normal')};
	opacity: ${props => (props.bold ? 1 : 0.8)};
	font-size: ${props => (props.bold ? '16px' : '15px')};
`
const Separator = styled.View`
	width: 1px;
	height: 13px;
	background-color: #d8d8d8;
	opacity: 0.6;
`

export default Header