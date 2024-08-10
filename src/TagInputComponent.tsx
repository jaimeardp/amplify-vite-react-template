
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';

import {  useState, useEffect } from "react";

import { generateClient } from "aws-amplify/data";

import type { Schema } from "../amplify/data/resource";

interface TagInputComponentProps {
  tags: any[];
  handleDelete: (i: number) => void;
  handleAddition: (tag: any) => void;
  onClearAll: () => void;
}

const client = generateClient<Schema>();


function TagInputComponent({ tags, handleDelete, handleAddition, onClearAll }: TagInputComponentProps) {

  const [tagsSugerence, setTagsSugerence] =  useState<Array<Schema["Tag"]["type"]>>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsSug = await client.models.Tag.list();
      console.log('Tags:');
      console.log(tagsSug.data);
      setTagsSugerence(tagsSug.data);
    };

    fetchTags();
  }
  , []);


  const onTagUpdate = (index: number, newTag: any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
  };

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const suggestions = tagsSugerence.map((tagBody) => {
    return {
      id: tagBody.id,
      text: tagBody.name,
      className: '',
    };
  });

  return (
    <div className='tags-input-container'>
      <ReactTags
        classNames={{
          tags: 'form-tags',
          tagInput: 'tag-input',
          tagInputField: 'form-control',
          selected: 'form-tag-selected',
          tag: 'form-tag',
          remove: 'form-tag-remove',
          suggestions: 'form-tag-suggestions',
          activeSuggestion: 'form-tag-active-suggestion',
          editTagInput: 'form-tag-edit-input',
          editTagInputField: 'form-tag-edit-input-field',
          clearAll: 'form-tag-clear-all',
        }}
        tags={tags}
        suggestions={suggestions}
        separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        onTagUpdate={onTagUpdate}
        inputFieldPosition="bottom"
        editable
        clearAll
        onClearAll={onClearAll}
        maxTags={5}
      />
    </div>
  );
};



export default TagInputComponent;
