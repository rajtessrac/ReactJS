import React, { useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Box } from '@mui/material';

const RichTextEditor = ({ value, onChange }) => {
  // Create a Slate editor object that can handle React and History
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box>
      {/* Slate Editor component */}
      <Slate
        editor={editor}
        value={value}  // Pass the value received from the parent component
        onChange={(newValue) => onChange(newValue)}  // Pass changes back to the parent component
      >
        <Editable placeholder="Enter text..." />
      </Slate>
    </Box>
  );
};

export default RichTextEditor;
