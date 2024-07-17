export const EditSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={props.width}
		height={props.height}
		className={props.className}
		fill="none"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="Edit / Edit_Pencil_01">
			<path
				id="Vector"
				d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
	</svg>
);

export const TickSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		width={props.width}
		height={props.height}
		className={props.className}
		viewBox="0 -0.5 25 25"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5.5 12.5L10.167 17L19.5 8"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const CrossSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		width={props.width}
		height={props.height}
		className={props.className}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" />
		<path d="M18 6L6.00001 18" stroke="currentColor" strokeLinecap="round" />
	</svg>
);

export const DeleteSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		width={props.width}
		height={props.height}
		className={props.className}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10 11V17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M14 11V17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M4 7H20"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const AddSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="currentColor"
		width={props.width}
		height={props.height}
		className="current-fit"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.25 12.75V18H12.75V12.75H18V11.25H12.75V6H11.25V11.25H6V12.75H11.25Z"
			fill="#508D69"
		/>
	</svg>
);

export const SortSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="currentColor"
		width={props.width}
		height={props.height}
		className="current-fit"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7 8H21M7 12H21M7 16H21M3 8H3.01M3 12H3.01M3 16H3.01"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
