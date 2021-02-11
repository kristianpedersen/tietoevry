export default function ClientInfo(props) {
	// Get user info and function for toggling individual user
	const { user, toggleUser } = props
	// Extract user info
	const { name, email, expanded } = user
	// Extract individual address parts
	const { street, suite, city } = user.address

	return (
		<>
			<h1 onClick={() => toggleUser(name)}>{name}</h1>
			{expanded &&
				<>
					<p>{`${street} ${suite}, ${city}`}</p>
					<p><a href={`mailto:${email}`}>{email.toLowerCase()}</a></p>
				</>
			}
		</>
	)
}