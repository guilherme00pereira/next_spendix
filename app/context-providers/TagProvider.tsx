'use client'
import React, {useState} from 'react';
import { TagContext } from '@/app/lib/contexts';
import { TagType } from '@/types/entities';

const TagProvider = ({children}: {children: React.ReactNode}) => {
  const [editableTag, setEditableTag] = useState({} as TagType);

  return (
    <TagContext.Provider value={{editableObject: editableTag, setEditableObject: setEditableTag}}>
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;