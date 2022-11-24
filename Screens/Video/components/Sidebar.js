import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
    right: 16px;
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

const Sidebar = ({ avatar, count }) => {
	return (
		<Container>
			<Menu>
				<User>
					<Avatar resizeMode='cover' source={avatar} />
				</User>
			</Menu>

			<Menu>
				<Icon name="heart" size={25} color={"#ffffff"}/>
				<Count>{count.like}</Count>
			</Menu>

			<Menu>
				<Icon
					size={25}
					name="message-circle"
                    color={"#ffffff"}
				/>
				<Count>{count.comment}</Count>
			</Menu>

			<Menu>
				<Icon size={25} name="share-2" color={"#ffffff"}/>
				<Count>{count.share}</Count>
			</Menu>

		</Container>
	)
}

export default Sidebar;