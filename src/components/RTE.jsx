import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const RTE = ({value, onChange}) => {
  return (
    <div>
         <Editor
            apiKey='jim98hnm3p1o44kmdzj3bea4fdcctzlq6roir2pfjq6zn76l'
            initialValue='Enter Content Hre ...'
            value={value}
            onEditorChange={onChange}
            init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
      />
    </div>
  )
}

export default RTE