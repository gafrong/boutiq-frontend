import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components';

const Gradient = styled(LinearGradient)`
	height: 100%;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`

export default Gradient;