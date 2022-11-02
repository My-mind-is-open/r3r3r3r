import React from "react"
import ContentLoader from "react-content-loader";

// type SkeletonProps = {
// 	props: boolean;
// }


const Skeleton: React.FC = (props) => (
	<ContentLoader
		speed={2}
		width={300}
		height={500}
		viewBox="0 0 320 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="552" y="226" rx="3" ry="3" width="52" height="6" />
		<circle cx="139" cy="139" r="135" />
		<rect x="82" y="353" rx="0" ry="0" width="1" height="3" />
		<circle cx="584" cy="528" r="6" />
		<rect x="550" y="492" rx="0" ry="0" width="96" height="66" />
		<rect x="0" y="289" rx="6" ry="6" width="280" height="32" />
		<rect x="0" y="342" rx="10" ry="10" width="280" height="77" />
		<rect x="124" y="437" rx="23" ry="23" width="152" height="45" />
		<rect x="11" y="446" rx="13" ry="13" width="85" height="24" />
		<rect x="63" y="470" rx="0" ry="0" width="7" height="6" />
	</ContentLoader>
)

export default Skeleton;