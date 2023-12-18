import React, { useState } from 'react'
import { useRef } from 'react'

import './Notebook.css'

const Notebook = () => {
	const [notes, setNotes] = useState([])
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
	const [currentNote, setCurrentNote] = useState('')
	const textareaRef = useRef(null)

	const handleNoteClick = index => {
		setSelectedNoteIndex(index)
		setCurrentNote(notes[index])
	}

	const addNote = () => {
		if (currentNote.trim() !== '') {
			setNotes([...notes, currentNote])
			setCurrentNote('')
		}
	}

	const saveNote = () => {
		if (selectedNoteIndex !== null && currentNote.trim() !== '') {
			const newNotes = [...notes]
			newNotes[selectedNoteIndex] = currentNote
			setNotes(newNotes)
			setSelectedNoteIndex(null)
			setCurrentNote('')
			if (textareaRef.current) {
				textareaRef.current.blur() // Remove focus from the textarea
			}
		}
	}
	const handleBlur = () => {
		if (selectedNoteIndex !== null && currentNote.trim() !== '') {
			saveNote()
		}
	}

	const deleteNote = index => {
		const newNotes = [...notes]
		newNotes.splice(index, 1)
		setNotes(newNotes)
		setSelectedNoteIndex(null)
	}

	const editNote = index => {
		const newNotes = [...notes]
		newNotes[index] = currentNote
		setNotes(newNotes)
		setSelectedNoteIndex(index)
		setCurrentNote('')
	}

	// const handleEnterPress = e => {
	// 	if (e.key === 'Enter') {
	// 		addNote()
	// 	}
	// }

	return (
		<div className='Notebook'>
			<div className='note-menu'>
				<button className='note-btn-add' onClick={addNote}>
					Новая заметка
				</button>

				<ul className='note-list'>
					{notes.map((note, index) => (
						<li
							className={
								('note-item',
								{
									selected: index === selectedNoteIndex,
								})
							}
							key={index}
							onClick={() => handleNoteClick(index)}
						>
							<span className='note-index'>Заметка {index + 1}</span>
							<div className='note-wrapper'>
								<div className='note-text'>{note}</div>
								<button
									className='note-btn-edit'
									onClick={() => editNote(index)}
								></button>
								<button
									className='note-btn-del'
									onClick={() => deleteNote(index)}
								></button>
							</div>
						</li>
					))}
				</ul>
			</div>

			<textarea
				name='note-textarea'
				className='note-textarea'
				ref={textareaRef}
				value={currentNote}
				placeholder={currentNote.trim() === '' ? 'Текст' : ''}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						saveNote()
					}
				}}
				onChange={e => setCurrentNote(e.target.value)}
				onBlur={handleBlur}
			/>
		</div>
	)
}

export default Notebook
