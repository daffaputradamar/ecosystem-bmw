'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor, { IJoditEditorProps, Jodit } from 'jodit-react';

type PartialJoditOptions = Partial<IJoditEditorProps['config']>;

interface RictTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
  }

const RictTextEditor = ({ value, onChange, placeholder }: RictTextEditorProps) => {
	const editor = useRef<any>(null);

	const config = useMemo<PartialJoditOptions>(() => ({
		placeholder: placeholder || '',
		readonly: false
	}), [placeholder])

	useEffect(() => {
		if (editor.current) {
		  editor.current.value = value;
		}
	  }, [value]);	

	return (
		<JoditEditor
			ref={editor}
			value={value}
			config={config}
			onBlur={newContent => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
	);
};

export default RictTextEditor;