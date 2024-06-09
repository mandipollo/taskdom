import React, { useEffect, useRef } from "react";

import { UserCallProps } from "../../utilities/userDataProps";

export const VideoPlayer: React.FC<{ user: UserCallProps }> = props => {
	const ref = useRef<HTMLDivElement>(null);

	const { user } = props;
	console.log(user);

	useEffect(() => {
		if (user.videoTrack) user.videoTrack.play(ref.current!);
	}, []);

	return (
		<div key={user.uid}>
			{user && <p>Uid: {user.uid}</p>}
			<div ref={ref} className="flex h-40 w-40"></div>
		</div>
	);
};
