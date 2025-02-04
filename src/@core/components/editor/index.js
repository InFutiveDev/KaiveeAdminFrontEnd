import { useEffect, useMemo, useState } from "react";

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const EditorCom = ({ dvalue = "", getContent, name }) => {
  return (
    <div>
      <CKEditor
        data={dvalue}
        editor={Editor}
        onReady={(editor) => {}}
        config={{
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "Heading 4",
                class: "ck-heading_heading4",
              },
              {
                model: "heading5",
                view: "h5",
                title: "Heading 5",
                class: "ck-heading_heading5",
              },
              {
                model: "heading6",
                view: "h6",
                title: "Heading 6",
                class: "ck-heading_heading6",
              },
            ],
          },
          fontSize: {
            options: [
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              "default",
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
            ],
          },
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "fontSize",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "imageInsert",
            "|",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
          image: {
            toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side", "linkImage"],
            insert: {
              type: "URL", // Allow inserting images by URL
            },
          },
        }}
        onChange={(event, editor) => {
          const data1 = editor.getData();
          getContent(data1, name);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};

export default EditorCom;
