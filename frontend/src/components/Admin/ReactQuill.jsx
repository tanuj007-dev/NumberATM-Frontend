import React, { Suspense } from 'react';
const LazyQuill = React.lazy(() => import('react-quill'));

import('react-quill/dist/quill.snow.css');
import("./quill.css"); // optional: your custom styles

export default function ReactQuillWrapper({ modules, formats, value, handleEditorChange }) {
  return (
    <div className="border border-gray-300 rounded p-2">
      <Suspense fallback={<div>Loading Editor...</div>}>
        <LazyQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={handleEditorChange}
        />
      </Suspense>
    </div>
  );
}
