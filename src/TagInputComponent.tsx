// create compoent simple of react using typescript tsx

// import React from 'react';

// import { WithContext as ReactTags, KEYS, SEPARATORS } from 'react-tag-input';

import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';


// const suggestions = COUNTRIES.map((country) => {
//     return {
//       id: country,
//       text: country,
//       className: '',
//     };
//   });
  
//   const KeyCodes = {
//     comma: 188,
//     enter: [10, 13],
//   };


// const TagInputComponent = () => {
    interface TagInputComponentProps {
        tags: any[];
        handleDelete: (i: number) => void;
        handleAddition: (tag: any) => void;
        onClearAll: () => void;
    }
    
    function TagInputComponent({ tags, handleDelete, handleAddition, onClearAll }: TagInputComponentProps) {

    // const [tags, setTags] = React.useState<Array<any>>([
    //     { id: 'Thailand', text: 'Thailand', className: '' },
    //     { id: 'India', text: 'India', className: '' },
    //     { id: 'Vietnam', text: 'Vietnam', className: '' },
    //     { id: 'Turkey', text: 'Turkey', className: '' },
    //   ]);
    
    //   const handleDelete = (index: number) => {
    //     setTags(tags.filter((_, i) => i !== index));
    //   };
    
      const onTagUpdate = (index: number, newTag: any) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        // setTags(updatedTags);
      };
    
    //   const handleAddition = (tag: any) => {
    //     setTags((prevTags) => {
    //       return [...prevTags, tag];
    //     });
    //   };
    
      const handleDrag = (tag: any, currPos: number, newPos: number) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        // setTags(newTags);
      };
    
      const handleTagClick = (index: number) => {
        console.log('The tag at index ' + index + ' was clicked');
      };
    
    //   const onClearAll = () => {
    //     console.log('Clearing all tags');
    //     setTags([]);
    //   };
    
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
              maxTags={7}
            />
          </div>
      );
    };



export default TagInputComponent;
