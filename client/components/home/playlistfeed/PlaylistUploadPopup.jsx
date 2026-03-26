import { useState } from "react";
import axios from "../../../api/axios.js";
import SubmitButton from "../../submitButton.jsx";
import PopUpComponent from "../../uploadPopup/popupComponent.jsx";

export default function PlaylistUploadPopup({ setShowPopup }) {
	const [loading, SetLoading] = useState(false);
	const [isSubmmited, setIsSubmmited] = useState(false);

	async function handlePostUpload(e) {
		e.preventDefault();
		const formdata = new FormData(e.target);
		SetLoading(true);
		const content = formdata.get("content");

		try {
			await axios.post(
				"tweets/create-tweet",
				{ content },
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		} catch (error) {
			console.log(error);
		}
		SetLoading(false);
		setIsSubmmited(true);
		setTimeout(() => {
			setIsSubmmited(false);
			setShowPopup(false);
		}, 1500);
	}
	return (
		<>
			<PopUpComponent onCancel={() => setShowPopup(false)}>
				<form
					className="text-left p-3 my-2"
					onSubmit={(e) => handlePostUpload(e)}
				>
					<label className="text-md font-base text-gray-700 ">
						what's on your mind?
						<textarea
							name="content"
							type="text"
							placeholder="The weather is beautifull..."
							className="bg-gray-100
                h-30 w-full p-2 border border-gray-300 text-sm mt-1 focus:outline-none"
						/>
					</label>
					<div className="flex items-center justify-center mt-3 ">

						<button
							type="button"
							onClick={() => setShowPopup(false)}
							className="border border-neutral-400 text-base font-semibold text-gray-800 p-4  flex items-center justify-center text-center rounded-full w-38 h-11"
						>
							Cancel
						</button>

						<SubmitButton
							currentSubmitStatus={
								isSubmmited ? "submited" : loading ? "loading" : "normal"
							}
							text={"Upload"}
							className={""}
						/>
					</div>
				</form>
			</PopUpComponent>
		</>
	);
}
