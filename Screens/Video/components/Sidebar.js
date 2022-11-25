import React from 'react'
import {Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
    right: 10px;
    position: absolute;
`
const Menu = styled.View`
	margin: 9px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const Avatar = styled.Image`
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

const Sidebar = (props) => {
    // console.log('sidebar', props)
    const navigationObj = props.props.navigation;
    const productObj = props.props.route;
    const userObj = props.user;
    console.log('USER', userObj)
    console.log("PRODUCT OBJ", productObj)
	return (
		<Container>
            <Pressable onPress={() => props.props.navigation.navigate('Store', {productObj, user:userObj})}>
                <Menu>
                    <User>
                        <Avatar resizeMode='cover' source={props.avatar}/>
                    </User>
                </Menu>
            </Pressable>
            <Pressable onPress={()=>alert("update like count")}>
                <Menu>
                    <Icon 
                        name="heart" 
                        size={25} 
                        color={"#ffffff"}/>
                    <Count>{props.count.like}</Count>
                </Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up comment field")}>
			<Menu>
				<Icon
					size={25}
					name="message-circle"
                    color={"#ffffff"}
				/>
				<Count>{props.count.comment}</Count>
			</Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up sharing field")}>
                <Menu>
                    <Icon 
                        size={25} 
                        name="send" 
                        color={"#ffffff"}/>
                    <Count>{props.count.share}</Count>
                </Menu>
            </Pressable>
		</Container>
	)
}

export default Sidebar;