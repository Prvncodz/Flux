import CancelIconComponent from "../userProfile/cancelIconComponent";

export default function PopUpComponent({ children, onCancel }) {
	return (
		<div
			className="h-screen w-screen flex flex-col justify-center
      items-center bg-none absolute z-20 top-0 left-0  "
		>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
				onClick={(e) => e.target === e.currentTarget && onCancel()}
			>

				<CancelIconComponent onClick={onCancel} />
				<div
					className="h-auto w-87 bg-gray-100 flex flex-col
        justify-center overflow-hidden rounded-lg absolute z-22 p-2 md:w-120 md:p-5 "
				>
					{children}
				</div>
			</div>
		</div>
	);
}
