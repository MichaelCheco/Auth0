import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	console.log(props, 'display');
	return (
		<Wrapper>
			{props.notes.map(note => (
				<Note key={note.id}>
					<h3>{note.title}</h3>
					<p>{note.content}</p>
					<p>Hey</p>
				</Note>
			))}
		</Wrapper>
	);
};

export default Notes;
