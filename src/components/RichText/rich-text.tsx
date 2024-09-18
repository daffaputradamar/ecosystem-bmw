'use client';
import { useEffect, useRef } from 'react';
import Editor from './editor';

interface RictTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
  }

const RictTextEditor = ({ value, onChange, placeholder }: RictTextEditorProps) => {
	
	return (
		<Editor
			content={value}
			placeholder={ placeholder ?? 'Description...'}
			onChange={onChange}
		/>
	);
};

export default RictTextEditor;