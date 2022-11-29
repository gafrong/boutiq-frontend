import React, {useState} from "react";
import { Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

import VideoPlayer from "./VideoPlayer";
import Sidebar from "./components/Sidebar";
import PagerView from 'react-native-pager-view';
import Info from "./components/Info";

const { height } = Dimensions.get('window')

const Container = styled(PagerView)`
    height: ${height}px;
    background-color: #000000;
`
const Gradient = styled(LinearGradient)`
	height: 100%;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`
const Center = styled.View`
	flex: 1;
	flex-direction: row;
`

const VideoCompiler = ({ videos, props }) => {
    const [selected, setSelected] = useState(0)

    return(
        <Container
            orientation='vertical'
            onPageSelected={e => setSelected(e.nativeEvent.position)}
            initialPage={0}
        >
            {videos.map((item, index) => {
                return(
                    <View key={index}>
                        <VideoPlayer 
                            video={item}
							isPlay={selected === index}
                        />
						{console.log('ITEM', item)}
                        <Gradient
							locations={[0, 0.26, 0.6, 1]}
							colors={[
								'rgba(26,26,26,0)',
								'rgba(26,26,26,0)',
								'rgba(26,26,26,0)',
								'rgba(26,26,26,0.6)'
							]}>
							<Center>
								<Info owner={item.owner} />
								<Sidebar avatar={item.owner.avatar} props={props} owner={item.owner} videoProps={item}/>
							</Center>
						</Gradient>
                    </View>
                )
            })}
        </Container>
    )
}

export default VideoCompiler;