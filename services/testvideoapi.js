import StoreProducts from '../Screens/Store/StoreProducts'

const api = [
	{
		id: 0,
		videoUrl: "https://sixandahalf.s3.ap-northeast-2.amazonaws.com/videos/daravideo.mp4",
		image: 'https://picsum.photos/700',
		owner: {
			username: 'whinderssonnunes',
			description: 'This is a test video for testing',
			music: 'som original',
			avatar: 'https://picsum.photos/700'
		},
		likes: new Map([
			["635880d8bb016260c83d72de", true],
			["6369e336bada7fee40de1ba5", true],
		  ]),
		comment: '4080',
		share: '2800',
		numReviews: 22,
		numViews: '24K',
		rating: 3,
		description: 'sdjkfa ajsdk adfjkal jaskdf ajl jskdfla jsakdla jdsfka dfjkaldsjf aklsf jdal',
		brand: 'Six and a half',
		followers: 770
	},
	{
		id: 1,
		videoUrl: require('../assets/videos/liv.mp4'),
		image: 'https://picsum.photos/700',
		owner: {
			username: 'luismariz',
			description:
				'lorem ipsum thie ajsdk amksd smfk asdmf mskdf amfk asdfmkafdmsk',
			music: 'som original',
			avatar: 'https://picsum.photos/700'
		},
		likes: new Map([
			["635880d8bb016260c83d72de", true],
			["6369e336bada7fee40de1ba5", true],
		]),
		comment: '4080',
		share: '2800',
		numReviews: 22,
		numViews: '24K',
		rating: 5,
		description: 'sdjkfa ajsdk adfjkal jaskdf ajl jskdfla jsakdla jdsfka dfjkaldsjf aklsf jdal',
		brand: '리바이스',
		followers: 35
	},
	{
		id: 2,
		videoUrl: require('../assets/videos/liv.mp4'),
		image: 'https://picsum.photos/700',
		owner: {
			username: 'asdjfkaldjklads',
			description:
				'lorem ipsum thie ajsdk amksd smfk asdmf mskdf amfk asdfmkafdmsk',
			music: 'som original',
			avatar: 'https://picsum.photos/700'
		},
		likes: new Map([
			["635880d8bb016260c83d72de", true],
		]),
		comment: '4080',
		share: '2800',
		numReviews: 22,
		numViews: '24K',
		rating: 2,
		description: 'sdjkfa ajsdk adfjkal jaskdf ajl jskdfla jsakdla jdsfka dfjkaldsjf aklsf jdal',
		brand: 'This is a very long brand name',
		followers: 750
	}
]
// products 
// 6375b6e4b2124c817b5daf83
// 6375b702b2124c817b5daf87
// 6375b71cb2124c817b5daf8b
// 637aca0d4264f69eff7c6632
// 637dad74e2265ed91d68dfe4

// videoitems
// 6351eb11c32162c9fde05278
// 63520e2878b6d89190ea6ae0
// 63521239c3fd2bdb6e3392da
// 63521244c3fd2bdb6e3392e3
export default api

