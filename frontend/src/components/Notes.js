import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
	border: 2px solid palegreen;
	display: flex;
	height: 100vh;
`;
const Note = styled.div`
	border: 2px solid lightgray;
	text-align: center;
	width: 200px;
	height: 200px;
	margin: 10px;
`;
const Notes = props => {
	if (!props.notes) return <p>Loading..</p>;
	console.log(props);
	return (
		<Wrapper>
			{props.notes.map(note => (
				<Note key={note.id}>
					<h3>{note.title}</h3>
					<p>{note.content}</p>
				</Note>
			))}
		</Wrapper>
	);
};

export default Notes;
